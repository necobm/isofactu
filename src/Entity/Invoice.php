<?php

namespace App\Entity;

use App\Entity\ValueObject\InvoiceNumber;
use App\Repository\InvoiceRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: InvoiceRepository::class)]
class Invoice
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    private \DateTimeImmutable $issueDate;
    #[ORM\Embedded(class: InvoiceNumber::class, columnPrefix: false)]
    private InvoiceNumber $invoiceNumber;
    #[ORM\ManyToOne(targetEntity: Subject::class)]
    private Subject $issuer;
    #[ORM\ManyToOne(targetEntity: Subject::class)]
    private Subject $recipient;

    public function getId(): ?int
    {
        return $this->id;
    }
}
