# TP Final - Plateforme de Jeu

## Objectifs
- Concevoir une architecture de microservices pour répondre aux besoins métier.
- Définir l’API qui pourrait être utilisée par l’IHM du jeu. Note : pas besoin d'implémenter une IHM pour ce projet.
- Implémenter une partie de cette API et des services derrière.

## Contexte
Nous allons développer une plateforme qui permet d'organiser des combats entre maîtres éleveurs.

### Le Master Trainer (MT)
- Chaque joueur est un Master Trainer avec une équipe composée d'au moins 5 Créatures.
- Un MT peut convier un autre Master à un match ou créer un match ouvert.
- Les badges collectés par le MT lors des matches prouvent son niveau !

### Le Store
- Pour composer sa team, on peut acheter des créatures disponibles dans le Store.
- On utilise un système de crédits pour payer. Certaines créatures coûtent 0 crédits au début.

### Le Match
- States : créé -> en cours -> finalisé
- Informations liées au match : joueurs, date de création, date de début, date de fin, gagnant, statut (en cours, fini, annulée), round en cours (si applicable)
- Déroulement (exemple) : 5 manches (rounds)
    - À chaque manche, les joueurs envoient une créature à l’arena.
    - Le système décide quelle créature l'emporte. Le perdant ne peut plus jouer lors de ce match.
    - Au bout de 5 manches, le match s'arrête, et le Master qui a gagné le plus de manches remporte le match, gagnant des crédits.

## Besoins Fonctionnels

### En tant qu'utilisateur, je peux…
- Créer un compte.
- Me connecter à la plateforme en utilisant mon nom d'utilisateur et un mot de passe.
- Voir et modifier mes informations.

### En tant que joueur, je peux…
#### Gérer mes créatures :
- Consulter la liste de créatures disponibles dans le store.
- "Acheter" une créature avec mes crédits et l'ajouter à ma team.

#### Interagir avec les autres joueurs :
- Voir la liste de joueurs : nom, nombre de matchs (gagnés, perdus), score, badges.
- Envoyer un message à un autre joueur.
- Voir les messages reçus.

#### Participer à la communauté :
- Consulter les invitations reçues.
- Créer un match : inviter un autre joueur ou créer un match ouvert.
- Consulter la liste de matchs.
- Consulter les détails d’un match : joueurs, statut (en cours, fini, annulé), manche en cours (si en cours), vainqueur (si fini).
- Consulter les détails d’une manche : créatures dans l’arena (avec le nom de son maître), statut (fini, en cours), créature vainqueur (si fini).
- Recevoir une notification quand je gagne un badge.

#### Participer à un match :
- Joindre un match existant : accepter une invitation ou joindre un match ouvert.
- Envoyer une créature à l’arena (modifier une manche).
- Consulter les détails d’un match (comme pour d.iv).
- Consulter le statut d’une manche (comme pour d.v).

### En tant qu'administrateur, je peux…
- Voir la liste de joueurs avec toutes leurs informations.
- Voir la liste de matchs.
- Effacer et modifier les joueurs et les matchs.
- Bannir un joueur.
- Consulter les statistiques de la plateforme : nombre de matchs par jour, nombre de matchs par créature, nombre de victoires par créature, etc.

### En tant que reporter, je peux…
- Extraire les statistiques de la plateforme : nombre de matchs par jour, nombre de matchs par créature, nombre de victoires par créature, etc.

## Besoins Techniques
- L’architecture de la plateforme doit être suffisamment modulaire et extensible pour pouvoir s’adapter à d’autres jeux du même style.
- Prévoir une extension qui permettrait de jouer contre une IA.
- Les microservices ne peuvent pas être accédés directement, seulement via un proxy/gateway.
- Pour éviter de surcharger les microservices, trouver un moyen de produire des statistiques sans les requêter directement.

## Contraintes à retenir
- Pour accéder aux ressources exposées par l’API, il faut être authentifié (sauf pour l’inscription et le login).
- Un joueur ne peut pas participer à plus de 3 matchs simultanés.
- Pour avoir les détails d'une manche :
    - Un joueur ne peut voir les détails que des manches jouées.
    - Un admin peut voir les détails de toutes les manches.

## Livrables
- Document d’architecture.
- Documentation de l’API.
- Implémentation minimale qui fonctionne.

## Suggestions pour l'implémentation
- Vous pouvez utiliser la PokeApi pour vous inspirer pour votre API.
- Voir comment marchent les push-notifications.
