<?php declare(strict_types=1);

namespace App\Entity\ValueObject;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Embeddable;

#[Embeddable]
class Address
{
    #[Column(type: Types::STRING, length: 255)]
    private string $address;
    #[Column(type: Types::STRING, length: 50)]
    private string $zipCode;
    #[Column(type: Types::STRING, length: 100)]
    private string $city;
    #[Column(type: Types::STRING, length: 100)]
    private string $province;
    #[Column(type: Types::STRING, length: 2)]
    private string $countryISOCode;
}
