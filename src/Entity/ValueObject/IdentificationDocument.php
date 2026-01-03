<?php declare(strict_types=1);

namespace App\Entity\ValueObject;

use App\Entity\DocumentType;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Embeddable;

#[Embeddable]
class IdentificationDocument
{
    #[Column(type: Types::STRING, length: 10)]
    private DocumentType $type;
    #[Column(type: Types::STRING, length: 100)]
    private string $number;
}
