import React, { useState } from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Paper,
  Tabs,
  Tab
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const FAQPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const faqData = {
    general: [
      {
        question: "Qu'est-ce que VoyageBagage ?",
        answer: "VoyageBagage est une plateforme qui met en relation les particuliers avec des transporteurs professionnels pour le transport de bagages et de colis au Maroc."
      },
      {
        question: "Comment fonctionne le service ?",
        answer: "Vous publiez votre demande de transport, les transporteurs vous proposent leurs services, vous choisissez le transporteur qui vous convient le mieux, et vous suivez votre livraison en temps réel."
      },
      {
        question: "Quelles sont les zones desservies ?",
        answer: "Notre service couvre l'ensemble du territoire marocain, avec une présence particulière dans les grandes villes comme Casablanca, Rabat, Marrakech, Tanger, etc."
      }
    ],
    securite: [
      {
        question: "Les transporteurs sont-ils vérifiés ?",
        answer: "Oui, tous nos transporteurs sont soigneusement sélectionnés. Nous vérifions leur identité, leurs documents professionnels et leur historique avant de les accepter sur la plateforme."
      },
      {
        question: "Comment sont assurés mes bagages ?",
        answer: "Chaque transport est couvert par une assurance. Les conditions peuvent varier selon le type de transport et la valeur déclarée des biens."
      },
      {
        question: "Comment puis-je suivre mon envoi ?",
        answer: "Vous recevez un numéro de suivi et pouvez suivre votre envoi en temps réel via notre plateforme ou application mobile."
      }
    ],
    paiement: [
      {
        question: "Quels sont les moyens de paiement acceptés ?",
        answer: "Nous acceptons les cartes bancaires, les virements bancaires et le paiement mobile (ex: PayPal, Apple Pay)."
      },
      {
        question: "Quand dois-je payer ?",
        answer: "Le paiement est effectué une fois que vous avez choisi votre transporteur. L'argent est sécurisé et n'est versé au transporteur qu'une fois la livraison confirmée."
      },
      {
        question: "Comment sont calculés les prix ?",
        answer: "Les prix sont basés sur plusieurs critères : distance, volume/poids des bagages, type de véhicule nécessaire et urgence de la livraison."
      }
    ],
    problemes: [
      {
        question: "Que faire en cas de retard ?",
        answer: "En cas de retard, vous serez notifié via la plateforme. Vous pouvez contacter directement le transporteur ou notre service client 24/7."
      },
      {
        question: "Comment annuler une réservation ?",
        answer: "Vous pouvez annuler votre réservation jusqu'à 24h avant le transport prévu. Des frais peuvent s'appliquer selon les conditions."
      },
      {
        question: "Comment contacter le support ?",
        answer: "Notre support est disponible 24/7 via chat, email (support@voyagebagage.ma) ou téléphone (06XXXXXXXX)."
      }
    ]
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const categories = [
    { key: 'general', label: 'Général' },
    { key: 'securite', label: 'Sécurité' },
    { key: 'paiement', label: 'Paiement' },
    { key: 'problemes', label: 'Problèmes & Support' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Foire Aux Questions
      </Typography>
      
      <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
        Trouvez rapidement des réponses à vos questions
      </Typography>

      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {categories.map((category, index) => (
            <Tab key={category.key} label={category.label} />
          ))}
        </Tabs>
      </Paper>

      {categories.map((category, index) => (
        <Box
          key={category.key}
          role="tabpanel"
          hidden={selectedTab !== index}
          sx={{ mb: 4 }}
        >
          {selectedTab === index && (
            <Box>
              {faqData[category.key].map((item, i) => (
                <Accordion key={i}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {item.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color="text.secondary">
                      {item.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Container>
  );
};

export default FAQPage; 