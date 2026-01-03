<?php declare(strict_types=1);

namespace App\Entity\ValueObject;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Embeddable;

#[Embeddable]
class InvoiceNumber
{
    #[Column(type: Types::STRING, length: 100, nullable: true)]
    private ?string $serial = null;
    #[Column(type: Types::STRING, length: 100)]
    private string $number;
}
