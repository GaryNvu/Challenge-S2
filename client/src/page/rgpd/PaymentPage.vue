<template>
    <div class="container mb-5">
        <article>
            <h1>Politique de prix</h1>
            <p>Tous les prix affichés sur notre site incluent la TVA, sauf indication contraire. Nous nous réservons le droit de modifier les prix à tout moment sans préavis. Les promotions et réductions sont valables uniquement pendant la période spécifiée.</p>

            <p>Prix des cartes à l'unité :</p>
            <p>Les prix des cartes à l'unité varient en fonction du marché. Nous nous efforçons de mettre à jour régulièrement les prix pour refléter les conditions du marché.</p>

            <h2>Sécurité des paiements</h2>
            <p>Nous utilisons Stripe, un leader des solutions de paiement en ligne, pour traiter les transactions sur notre site. Stripe est certifié conformément aux normes de sécurité des données de l'industrie des cartes de paiement (PCI DSS). Aucune information bancaire n'est stockée sur nos serveurs. Toutes les informations de paiement sont traitées de manière sécurisée par Stripe, qui utilise des technologies de cryptage avancées pour protéger vos données.</p>
            <p>Pour plus de précisions et de détails vous pouvez vous référer à la <a href="https://docs.stripe.com/security?locale=fr-FR">documentation sur la sécurite</a> de Stripe</p>

            <h2>Modalités de paiement</h2>
            <h2>Méthodes de Paiement Acceptées</h2>
            <p>Vous pouvez effectuer vos paiements en utilisant l'une des méthodes suivantes via l'interface de Stripe :</p>
            <ul>
                <li>Cartes de crédit et de débit - Nous acceptons les cartes Visa, MasterCard, American Express, Maestro et CB.</li>
                <li>Portefeuilles électroniques - Des options comme Apple Pay ou PayPal sont également disponibles.</li>
            </ul>
            <p>Pour plus de détails veuillez vous référrez à la page de <a href="https://stripe.com/fr/payments">moyens de paiements de Stripe</a>.</p>
            <p>Au moment du paiement, vous serez redirigé vers une page sécurisée pour saisir vos informations de paiement et valider la transaction. Une fois le paiement approuvé, vous recevrez une confirmation de commande par e-mail.</p>

            <h2>Droit de rétractation et remboursements</h2>
            <p>Conformément à la réglementation en vigueur, vous disposez d'un droit de rétractation de 14 jours à compter de la réception de votre commande pour changer d'avis. Pour exercer ce droit, veuillez nous contacter à l'adresse suivante : cardory.support@gmail.com. Les retours et les demandes de remboursement seront traités conformément à notre politique de retour.</p>
        </article>
    </div>
</template>

<style scoped>
    .container {
        width: 80%;
        margin: auto;
        margin-top: 4rem;
        display: flex;
        flex-direction: column;
    }

    h2 {
        font-size: 1.5rem;
        margin-top: 2rem;
    }
</style>