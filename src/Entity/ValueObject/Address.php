<?php declare(strict_types=1);

namespace App\Entity\ValueObject;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Embeddable;

#[Embeddable]
class Address
{
    #[Column(type: Types::STRING, length: 255)]
    private string $address = '';

    #[Column(type: Types::STRING, length: 50)]
    private string $zipCode = '';

    #[Column(type: Types::STRING, length: 100)]
    private string $city = '';

    #[Column(type: Types::STRING, length: 100)]
    private string $province = '';

    #[Column(type: Types::STRING, length: 2)]
    private string $countryISOCode = 'ES';

    public function __construct(
        string $address = '',
        string $zipCode = '',
        string $city = '',
        string $province = '',
        string $countryISOCode = 'ES'
    ) {
        $this->address = $address;
        $this->zipCode = $zipCode;
        $this->city = $city;
        $this->province = $province;
        $this->countryISOCode = $countryISOCode;
    }

    public function getAddress(): string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getZipCode(): string
    {
        return $this->zipCode;
    }

    public function setZipCode(string $zipCode): static
    {
        $this->zipCode = $zipCode;

        return $this;
    }

    public function getCity(): string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

        return $this;
    }

    public function getProvince(): string
    {
        return $this->province;
    }

    public function setProvince(string $province): static
    {
        $this->province = $province;

        return $this;
    }

    public function getCountryISOCode(): string
    {
        return $this->countryISOCode;
    }

    public function setCountryISOCode(string $countryISOCode): static
    {
        $this->countryISOCode = $countryISOCode;

        return $this;
    }

    public function __toString(): string
    {
        return sprintf(
            '%s, %s %s, %s (%s)',
            $this->address,
            $this->zipCode,
            $this->city,
            $this->province,
            $this->countryISOCode
        );
    }
}
