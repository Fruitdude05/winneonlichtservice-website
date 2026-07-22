<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => ['message' => 'method_not_allowed']]);
    exit;
}

$configPath = __DIR__ . '/openai-config.php';
if (!is_file($configPath)) {
    http_response_code(503);
    echo json_encode(['error' => ['message' => 'not_configured'], 'email' => false, 'whatsapp' => false]);
    exit;
}

$config = require $configPath;
$web3FormsKey = trim($config['WEB3FORMS_ACCESS_KEY'] ?? '');
$callMeBotKey = trim($config['CALLMEBOT_API_KEY'] ?? '');
$whatsappNumber = trim($config['WHATSAPP_NUMBER'] ?? '4915562052989');

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput ?: '', true);

if (!is_array($input) || !isset($input['event']) || !is_string($input['event'])) {
    http_response_code(400);
    echo json_encode(['error' => ['message' => 'invalid_request'], 'email' => false, 'whatsapp' => false]);
    exit;
}

$allowedEvents = ['chat_opened', 'user_message', 'assistant_reply', 'whatsapp_handoff'];
$event = $input['event'];

if (!in_array($event, $allowedEvents, true)) {
    http_response_code(400);
    echo json_encode(['error' => ['message' => 'invalid_event'], 'email' => false, 'whatsapp' => false]);
    exit;
}

$pageUrl = is_string($input['pageUrl'] ?? null) ? $input['pageUrl'] : '';
$userMessage = is_string($input['userMessage'] ?? null) ? $input['userMessage'] : '';
$transcript = is_array($input['transcript'] ?? null) ? $input['transcript'] : [];

$subjects = [
    'chat_opened' => 'Neuer Website-Chat gestartet',
    'user_message' => 'Neue Chat-Nachricht auf der Website',
    'assistant_reply' => 'Dave-Antwort im Website-Chat',
    'whatsapp_handoff' => 'Chat-Besucher möchte per WhatsApp sprechen',
];

$intros = [
    'chat_opened' => 'Ein Besucher hat den KI-Chat auf Ihrer Website geöffnet.',
    'user_message' => 'Neue Nachricht im Website-Chat:',
    'assistant_reply' => 'Dave hat geantwortet. Vollständiger Chat-Verlauf:',
    'whatsapp_handoff' => 'Ein Besucher möchte nach dem KI-Chat direkt per WhatsApp mit Ihnen sprechen.',
];

$subject = $subjects[$event];
$bodyParts = [
    $intros[$event],
    '',
    'Seite: ' . $pageUrl,
    'Zeitpunkt: ' . (new DateTime('now', new DateTimeZone('Europe/Berlin')))->format('d.m.Y H:i:s'),
];

if ($userMessage !== '') {
    $bodyParts[] = '';
    $bodyParts[] = "Nachricht des Besuchers:\n" . $userMessage;
}

if ($transcript !== []) {
    $bodyParts[] = '';
    $bodyParts[] = 'Chat-Verlauf:';
    foreach ($transcript as $entry) {
        if (!is_array($entry)) {
            continue;
        }
        $role = ($entry['role'] ?? '') === 'user' ? 'Besucher' : 'Dave';
        $content = is_string($entry['content'] ?? null) ? $entry['content'] : '';
        if ($content !== '') {
            $bodyParts[] = $role . ': ' . $content;
            $bodyParts[] = '';
        }
    }
}

$body = trim(implode("\n", $bodyParts));
$whatsappText = mb_substr(
    "Website-Chat: {$subject}\n" . ($userMessage !== '' ? "Besucher: {$userMessage}" : $intros[$event]) . "\n{$pageUrl}",
    0,
    1200,
);

function postJson(string $url, array $payload): bool
{
    if (!function_exists('curl_init')) {
        return false;
    }

    $json = json_encode($payload);
    if ($json === false) {
        return false;
    }

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'Accept: application/json'],
        CURLOPT_POSTFIELDS => $json,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 20,
    ]);

    $response = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($response === false || $status < 200 || $status >= 300) {
        return false;
    }

    $result = json_decode($response, true);
    return is_array($result) && !empty($result['success']);
}

function sendEmailNotification(string $accessKey, string $subject, string $body): bool
{
    return postJson('https://api.web3forms.com/submit', [
        'access_key' => $accessKey,
        'subject' => '[Website-Chat] ' . $subject,
        'name' => 'Website-Besucher',
        'email' => 'chat@winneonlichtservice.de',
        'message' => $body,
        'from_name' => 'Win Neonlicht-Service Chat',
        'botcheck' => '',
    ]);
}

function sendWhatsAppNotification(string $apiKey, string $phone, string $text): bool
{
    if (!function_exists('curl_init')) {
        return false;
    }

    $url = 'https://api.callmebot.com/whatsapp.php?' . http_build_query([
        'phone' => $phone,
        'text' => $text,
        'apikey' => $apiKey,
    ]);

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 20,
    ]);

    $response = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($response === false || $status < 200 || $status >= 300) {
        return false;
    }

    return stripos((string) $response, 'error') === false;
}

$emailSent = $web3FormsKey !== '' && sendEmailNotification($web3FormsKey, $subject, $body);
$whatsappSent = $callMeBotKey !== '' && sendWhatsAppNotification($callMeBotKey, $whatsappNumber, $whatsappText);

if (!$emailSent && !$whatsappSent && ($web3FormsKey === '' && $callMeBotKey === '')) {
    http_response_code(503);
    echo json_encode(['error' => ['message' => 'not_configured'], 'email' => false, 'whatsapp' => false]);
    exit;
}

echo json_encode(['email' => $emailSent, 'whatsapp' => $whatsappSent]);
