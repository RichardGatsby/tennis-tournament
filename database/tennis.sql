
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

COMMIT;
