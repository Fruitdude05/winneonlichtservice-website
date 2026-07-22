<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'method_not_allowed']);
    exit;
}

$configPath = __DIR__ . '/openai-config.php';
if (!is_file($configPath)) {
    http_response_code(503);
    echo json_encode(['success' => false, 'message' => 'not_configured']);
    exit;
}

$config = require $configPath;
$accessKey = trim($config['WEB3FORMS_ACCESS_KEY'] ?? '');

if ($accessKey === '') {
    http_response_code(503);
    echo json_encode(['success' => false, 'message' => 'not_configured']);
    exit;
}

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput ?: '', true);

if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'invalid_request']);
    exit;
}

$name = trim((string) ($input['name'] ?? ''));
$email = trim((string) ($input['email'] ?? ''));
$subject = trim((string) ($input['subject'] ?? ''));
$message = trim((string) ($input['message'] ?? ''));
$phone = trim((string) ($input['phone'] ?? ''));

if ($name === '' || $email === '' || $subject === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'missing_fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'invalid_email']);
    exit;
}

if (!function_exists('curl_init')) {
    http_response_code(503);
    echo json_encode(['success' => false, 'message' => 'delivery_unavailable']);
    exit;
}

$payload = json_encode([
    'access_key' => $accessKey,
    'subject' => $subject,
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'message' => $message,
    'from_name' => 'Win Neonlicht-Service Website',
    'replyto' => $email,
    'botcheck' => '',
]);

if ($payload === false) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'encode_failed']);
    exit;
}

$ch = curl_init('https://api.web3forms.com/submit');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'Accept: application/json'],
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 20,
]);

$response = curl_exec($ch);
$status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response === false || $status < 200 || $status >= 300) {
    // 503 → Frontend versucht Web3Forms direkt im Browser.
    http_response_code(503);
    echo json_encode(['success' => false, 'message' => 'delivery_failed']);
    exit;
}

$result = json_decode($response, true);
if (!is_array($result) || empty($result['success'])) {
    http_response_code(502);
    echo json_encode([
        'success' => false,
        'message' => is_string($result['message'] ?? null) ? $result['message'] : 'delivery_failed',
    ]);
    exit;
}

echo json_encode(['success' => true, 'message' => 'sent']);
