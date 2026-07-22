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
    echo json_encode(['error' => ['message' => 'not_configured']]);
    exit;
}

$config = require $configPath;
$apiKey = trim($config['OPENAI_API_KEY'] ?? '');

if ($apiKey === '') {
    http_response_code(503);
    echo json_encode(['error' => ['message' => 'not_configured']]);
    exit;
}

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput ?: '', true);

if (!is_array($input) || !isset($input['messages']) || !is_array($input['messages'])) {
    http_response_code(400);
    echo json_encode(['error' => ['message' => 'invalid_request']]);
    exit;
}

$payload = json_encode([
    'model' => 'gpt-4o-mini',
    'temperature' => 0.3,
    'max_tokens' => 500,
    'messages' => $input['messages'],
]);

if ($payload === false) {
    http_response_code(400);
    echo json_encode(['error' => ['message' => 'invalid_request']]);
    exit;
}

if (!function_exists('curl_init')) {
    http_response_code(500);
    echo json_encode(['error' => ['message' => 'curl_missing']]);
    exit;
}

$ch = curl_init('https://api.openai.com/v1/chat/completions');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey,
    ],
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 30,
]);

$response = curl_exec($ch);
$status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response === false || $status === 0) {
    http_response_code(502);
    echo json_encode(['error' => ['message' => 'upstream_failed']]);
    exit;
}

http_response_code($status);
echo $response;
