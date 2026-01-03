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
    private string $number = '';

    public function __construct(string $number, ?string $serial = null)
    {
        $this->number = $number;
        $this->serial = $serial;
    }

    public function getSerial(): ?string
    {
        return $this->serial;
    }

    public function setSerial(?string $serial): static
    {
        $this->serial = $serial;

        return $this;
    }

    public function getNumber(): string
    {
        return $this->number;
    }

    public function setNumber(string $number): static
    {
        $this->number = $number;

        return $this;
    }

    public function __toString(): string
    {
        if ($this->serial !== null && $this->serial !== '') {
            return sprintf('%s-%s', $this->serial, $this->number);
        }

        return $this->number;
    }
}
