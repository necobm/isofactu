<?php

namespace App\Controller\Admin;

use App\Entity\Subject;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class SubjectCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Subject::class;
    }

    public function configureFields(string $pageName): iterable
    {
        yield IdField::new('id')->hideOnForm();
        yield TextField::new('fullName');
        yield TextField::new('document.type', 'Document Type');
        yield TextField::new('document.number', 'Document Number');
        yield TextField::new('address.address', 'Address');
        yield TextField::new('address.zipCode', 'Zip Code');
        yield TextField::new('address.city', 'City');
        yield TextField::new('address.province', 'Province');
        yield TextField::new('address.countryISOCode', 'Country');
    }
}
