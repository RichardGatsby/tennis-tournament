
CREATE DATABASE IF NOT EXISTS tennis;

BEGIN;

CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,
    name text NOT NULL
);

CREATE TABLE matches (
    match_id SERIAL PRIMARY KEY,
    match_type varchar NULL,
    player_one_id integer NOT NULL,
    player_two_id integer NOT NULL,
    player_one_score varchar NULL,
    player_two_score varchar NULL,
    winner integer NULL
);

-- Added 06.02.2022 as the first step to start supporting tournament history
CREATE TABLE tournaments (
    tournament_id SERIAL PRIMARY KEY,
    tournament_type varchar NULL,
    name varchar NOT NULL,
    start_dt timestamp NOT NULL,
    end_dt timestamp NULL
);

--TODO: Alter this to not null once we have the first tournament created and data migrated in real db
ALTER TABLE matches
ADD COLUMN tournament_id integer NULL;

--Added 06.02.2022 Alter to have fk constrains after the first match data has been fixed in "prod"
ALTER TABLE matches 
ADD CONSTRAINT fk_tournaments FOREIGN KEY (tournament_id) 
REFERENCES tournaments (tournament_id) MATCH FULL;


CREATE TABLE tournaments_players (
    tournament_id integer,
    player_id integer,
    CONSTRAINT fk_player
      FOREIGN KEY(player_id) 
	  REFERENCES players(player_id),
    CONSTRAINT fk_tournament
      FOREIGN KEY(tournament_id) 
	  REFERENCES tournaments(tournament_id)
);

COMMIT;
