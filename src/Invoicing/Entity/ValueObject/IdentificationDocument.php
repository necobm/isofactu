<?php declare(strict_types=1);

namespace App\Invoicing\Entity\ValueObject;

use App\Invoicing\Entity\DocumentType;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Embeddable;

#[Embeddable]
class IdentificationDocument
{
    #[Column(type: Types::STRING, length: 10, enumType: DocumentType::class)]
    private DocumentType $type;

    #[Column(type: Types::STRING, length: 100)]
    private string $number = '';

    public function __construct(DocumentType $type = DocumentType::NIF, string $number = '')
    {
        $this->type = $type;
        $this->number = $number;
    }

    public function getType(): DocumentType
    {
        return $this->type;
    }

    public function setType(DocumentType $type): static
    {
        $this->type = $type;

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
        return sprintf('%s: %s', $this->type->value, $this->number);
    }
}
