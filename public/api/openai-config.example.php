<?php
return [
    // Kopie als openai-config.php anlegen und echte Keys eintragen (nicht committen).
    'OPENAI_API_KEY' => 'sk-proj-...',

    // Optional: Web3Forms serverseitig (Hostinger Free-Plan oft blockiert — Browser-Fallback nutzt VITE_ Key im Build).
    // https://web3forms.com
    'WEB3FORMS_ACCESS_KEY' => '',

    // Optional: WhatsApp-Benachrichtigung bei Chat (CallMeBot)
    'CALLMEBOT_API_KEY' => '',
    'WHATSAPP_NUMBER' => '4915562052989',
];
