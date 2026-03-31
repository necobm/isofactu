<?php

namespace App\Invoicing\Entity;

enum DocumentType: string
{
    case CIF = 'CIF';
    case NIF = 'NIF';
    case OTHER = 'OTHER';
}
