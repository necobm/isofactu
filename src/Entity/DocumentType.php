<?php

namespace App\Entity;

enum DocumentType: string
{
    case CIF = 'CIF';
    case NIF = 'NIF';
    case OTHER = 'OTHER';
}
