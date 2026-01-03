<?php

namespace App\Controller\Admin;

use App\Entity\InvoiceLine;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class InvoiceLineCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return InvoiceLine::class;
    }

    public function configureFields(string $pageName): iterable
    {
        yield IdField::new('id')->hideOnForm();
        yield TextField::new('description');
        yield NumberField::new('quantity')->setNumDecimals(2);
        yield NumberField::new('unitPrice')->setNumDecimals(2);
        yield NumberField::new('taxRate', 'Tax Rate (%)')->setNumDecimals(2);
    }
}
