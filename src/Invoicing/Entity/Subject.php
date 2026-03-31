<?php

namespace App\Invoicing\Entity;

use App\Invoicing\Entity\DocumentType;
use App\Invoicing\Entity\ValueObject\Address;
use App\Invoicing\Entity\ValueObject\IdentificationDocument;
use App\Invoicing\Repository\SubjectRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SubjectRepository::class)]
class Subject
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Embedded(class: IdentificationDocument::class, columnPrefix: 'document_')]
    private IdentificationDocument $document;

    #[ORM\Column(type: Types::STRING, length: 255)]
    private string $fullName = '';

    #[ORM\Embedded(class: Address::class, columnPrefix: 'address_')]
    private Address $address;

    public function __construct()
    {
        $this->document = new IdentificationDocument(DocumentType::NIF, '');
        $this->address = new Address();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDocument(): IdentificationDocument
    {
        return $this->document;
    }

    public function setDocument(IdentificationDocument $document): static
    {
        $this->document = $document;

        return $this;
    }

    public function getFullName(): string
    {
        return $this->fullName;
    }

    public function setFullName(string $fullName): static
    {
        $this->fullName = $fullName;

        return $this;
    }

    public function getAddress(): Address
    {
        return $this->address;
    }

    public function setAddress(Address $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function __toString(): string
    {
        return $this->fullName;
    }
}
