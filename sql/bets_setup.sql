create table bets (
  bet_id serial not null,
  user_id int8 not null,
  race_id int2 not null,
  bet_amount int8 not null, 
  primary key(bet_id),
  foreign key(race_id) references races(race_id) on delete cascade
)