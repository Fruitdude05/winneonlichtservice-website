<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=300');

$configPath = __DIR__ . '/openai-config.php';
if (!is_file($configPath)) {
    http_response_code(503);
    echo json_encode(['web3formsAccessKey' => '']);
    exit;
}

$config = require $configPath;
$key = trim($config['WEB3FORMS_ACCESS_KEY'] ?? '');

echo json_encode(['web3formsAccessKey' => $key]);
