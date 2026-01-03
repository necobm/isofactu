<?php

namespace App\Controller\Admin;

use App\Entity\Invoice;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\CollectionField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class InvoiceCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Invoice::class;
    }

    public function configureFields(string $pageName): iterable
    {
        yield IdField::new('id')->hideOnForm();
        yield TextField::new('invoiceNumber.serial', 'Serial')->setRequired(false);
        yield TextField::new('invoiceNumber.number', 'Number');
        yield DateField::new('issueDate');
        yield AssociationField::new('issuer');
        yield AssociationField::new('recipient');
        yield CollectionField::new('lines')
            ->useEntryCrudForm(InvoiceLineCrudController::class)
            ->hideOnIndex();
    }
}
