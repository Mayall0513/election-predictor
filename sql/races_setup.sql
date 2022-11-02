create table races (
  race_id serial primary key,
  race_type smallint ,
  race_index bigint,
  state_id varchar(16),
  candidate_name varchar(255),
  candidate_party varchar(16),
  incumbent boolean
);


-- Governor races

-- Oregon

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'or', 'Christine Drazan', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'or', 'Tina Kotek', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'or', 'Other candidate', 'oth', false);

-- California

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ca', 'Gavin Newsom', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ca', 'Brian Dahle', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ca', 'Other candidate', 'oth', false);

-- Nevada

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'nv', 'Joe Lombardo', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'nv', 'Steve Sisolak', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'nv', 'Other candidate', 'oth', false);

-- Arizona

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'az', 'Kari Lake', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'az', 'Katie Hobbs', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'az', 'Other candidate', 'oth', false);

-- Idaho

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'id', 'Brad Little', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'id', 'Stephen Heidt', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'id', 'Other candidate', 'oth', false);

-- Wyoming

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'wy', 'Mark Gordon', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'wy', 'Theresa Livingston', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'wy', 'Other candidate', 'oth', false);

-- Colorado

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'co', 'Jared Polis', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'co', 'Heidi Ganahl', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'co', 'Other candidate', 'oth', false);

-- New Mexico

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'nm', 'Michelle Lujan Grisham', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'nm', 'Mark Ronchetti', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'nm', 'Other candidate', 'oth', false);

-- South Dakota

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'sd', 'Kristi Noem', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'sd', 'Jamie Smith', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'sd', 'Other candidate', 'oth', false);

-- Nebraska

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ne', 'Jim Pillen', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ne', 'Carol Blood', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ne', 'Other candidate', 'oth', false);

-- Kansas

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ks', 'Laura Kelly', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ks', 'Derek Schmidt', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ks', 'Other candidate', 'oth', false);

-- Oklahoma

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ok', 'Kevin Stitt', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ok', 'Joy Hoffmeister', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ok', 'Other candidate', 'oth', false);

-- Texas

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'tx', 'Greg Abbott', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'tx', E'Beto O\'Rourke', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'tx', 'Other candidate', 'oth', false);

-- Minnesota

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'mn', 'Tim Walz', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'mn', 'Scott Jensen', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'mn', 'Other candidate', 'oth', false);

-- Iowa

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ia', 'Kim Reynolds', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ia', 'Deidre DeJear', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ia', 'Other candidate', 'oth', false);

-- Arkansas

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ar', 'Sarah Huckabee Sanders', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ar', 'Chris Jones', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ar', 'Other candidate', 'oth', false);

-- Wisconsin

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'wi', 'Tony Evers', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'wi', 'Tim Michels', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'wi', 'Other candidate', 'oth', false);

-- Illinois

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'il', 'Jay Robert Pritzker', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'il', 'Darren Bailey', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'il', 'Other candidate', 'oth', false);

-- Tennessee

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'tn', 'Bill Lee', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'tn', 'Jason Brantly Martin', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'tn', 'Other candidate', 'oth', false);

-- Alabama

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'al', 'Kay Ivey', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'al', 'Yolanda Rochelle Flowers', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'al', 'Other candidate', 'oth', false);

-- Georgia

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ga', 'Brian Kemp', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ga', 'Stacy Abrams', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ga', 'Other candidate', 'oth', false);

-- Florida

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'fl', 'Ron DeSantis', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'fl', 'Charlie Crist', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'fl', 'Other candidate', 'oth', false);

-- South Carolina

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'sc', 'Henry McMaster', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'sc', 'Joe Cunningham', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'sc', 'Other candidate', 'oth', false);

-- Michigan

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'mi', 'Getchem Whitmer', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'mi', 'Tudor Dixon', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'mi', 'Other candidate', 'oth', false);

-- Ohio

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'oh', 'Mike DeWine', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'oh', 'Nan Whaley', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'oh', 'Other candidate', 'oth', false);

-- Pennsylvania

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'pa', 'Josh Shapiro', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'pa', 'Douglas Mastriano', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'pa', 'Other candidate', 'oth', false);

-- Maryland

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'md', 'Wes Moore', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'md', 'Dan Cox', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'md', 'Other candidate', 'oth', false);

-- New York

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ny', 'Kathy Hochul', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ny', 'Lee Zeldin', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ny', 'Other candidate', 'oth', false);

-- Vermont

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'vt', 'Phil Scott', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'vt', 'Brenda Siegal', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'vt', 'Other candidate', 'oth', false);

-- Conneticut

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ct', 'Edward Lamont', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ct', 'Robert Stefanowki', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ct', 'Other candidate', 'oth', false);

-- New Hampshire

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'nh', 'Chris Sununu', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'nh', 'Tom Sherman', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'nh', 'Other candidate', 'oth', false);

-- Rhode Island

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ri', 'Daniel McKee', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ri', 'Ashley Kalus', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ri', 'Other candidate', 'oth', false);

-- Massachusetts

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ma', 'Maura Healey', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ma', 'Geoff Diehl', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ma', 'Other candidate', 'oth', false);

-- Maine

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'me', 'Janet Mills', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'me', 'Paul LePage', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'me', 'Other candidate', 'oth', false);

-- Alaska

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ak', 'Mike Dunleavy', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ak', 'Bill Walker', 'ind', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ak', 'Les Gara', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ak', 'Charlie Pierce', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'ak', 'Other candidate', 'oth', false);

-- Hawaii

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'hi', 'Josh Green', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'hi', 'Duke Aiona', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (0, 0, 'hi', 'Other candidate', 'oth', false);


-- Senate races


-- Washington

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'wa', 'Patty Murray', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'wa', 'Tiffany Smiley', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'wa', 'Other candidate', 'oth', false);

-- Oregon

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'or', 'Ron Wyden', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'or', 'Jo Rae Perkins', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'or', 'Other candidate', 'oth', false);

-- California

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ca', 'Alex Padilla', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ca', 'Mark Meuser', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ca', 'Other candidate', 'oth', false);

-- Nevada

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'nv', 'Adam Laxalt', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'nv', 'Catherine Cortez Masto', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'nv', 'Other candidate', 'oth', false);

-- Arizona

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'az', 'Mark Kelly', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'az', 'Blake Masters', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'az', 'Other candidate', 'oth', false);

-- Utah

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ut', 'Mike Lee', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ut', 'Evan McMullin', 'ind', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ut', 'Other candidate', 'oth', false);

-- Idaho

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'id', 'Mike Crapo', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'id', 'David Roth', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'id', 'Other candidate', 'oth', false);


-- Colorado

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'co', 'Michael Bennett', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'co', E'Joe O\'Dea', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'co', 'Other candidate', 'oth', false);

-- North Dakota

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'nd', 'John Hoeven', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'nd', 'Katrina Christiansen', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'nd', 'Other candidate', 'oth', false);

-- South Dakota

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'sd', 'John Thune', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'sd', 'Brian Bengs', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'sd', 'Other candidate', 'oth', false);

-- Kansas

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ks', 'Jerry Moran', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ks', 'Mark Holland', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ks', 'Other candidate', 'oth', false);

-- Oklahoma 1

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ok', 'James Lankford', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ok', 'Madison Horn', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ok', 'Other candidate', 'oth', false);

-- Oklahoma 2

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 1, 'ok', 'Markwayne Mullin', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 1, 'ok', 'Kendra Horn', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 1, 'ok', 'Other candidate', 'oth', false);

-- Iowa

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ia', 'Chuck Grassley', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ia', 'Michael Franken', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ia', 'Other candidate', 'oth', false);

-- Missouri

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'mo', 'Eric Schmitt', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'mo', 'Trudy Valentine', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'mo', 'Other candidate', 'oth', false);

-- Arkansas

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ar', 'John Boozman', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ar', 'Natalie James', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ar', 'Other candidate', 'oth', false);

-- Louisiana

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'la', 'John Kennedy', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'la', 'Devin Graham', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'la', 'Luke Mixon', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'la', 'Gary Chambers', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'la', 'Syrita Steib', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'la', 'Salvador Rodriguez', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'la', 'Other candidate', 'oth', false);

-- Wisconsin

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'wi', 'Ron Johnson', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'wi', 'Mandela Barnes', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'wi', 'Other candidate', 'oth', false);

-- Illinois

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'il', 'Tammy Duckworth', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'il', 'Kathy Salvi', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'il', 'Other candidate', 'oth', false);

-- Indiana

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'in', 'Todd Young', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'in', 'Thomas McDermott', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'in', 'Other candidate', 'oth', false);

-- Kentucky

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ky', 'Rand Paul', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ky', 'Charles Booker', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ky', 'Other candidate', 'oth', false);

-- Alabama

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'al', 'Katie Britt', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'al', 'Will Boyd', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'al', 'Other candidate', 'oth', false);

-- Georgia

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ga', 'Herschel Walker', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ga', 'Raphael Warnock', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ga', 'Other candidate', 'oth', false);

-- Florida

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'fl', 'Marco Rubio', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'fl', 'Val Demings', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'fl', 'Other candidate', 'oth', false);

-- South Carolina

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'sc', 'Tim Scott', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'sc', 'Krystle Matthews', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'sc', 'Other candidate', 'oth', false);

-- North Carolina

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'nc', 'Ted Budd', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'nc', 'Cheri Beasley', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'nc', 'Other candidate', 'oth', false);

-- Ohio

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'oh', 'J.D. Vance', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'oh', 'Tim Ryan', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'oh', 'Other candidate', 'oth', false);

-- Pennsylvania

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'pa', 'Mehmet Oz', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'pa', 'John Fetterman', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'pa', 'Other candidate', 'oth', false);

-- Maryland

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'md', 'Chris Van Hollen', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'md', 'Chris Chaffee', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'md', 'Other candidate', 'oth', false);

-- New York

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ny', 'Chuck Schumer', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ny', 'Joe Pinion', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ny', 'Other candidate', 'oth', false);

-- Vermont

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'vt', 'Peter Welch', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'vt', 'Gerald Malloy', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'vt', 'Other candidate', 'oth', false);

-- Conneticut

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ct', 'Richard Blumenthal', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ct', 'Leora Levy', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ct', 'Other candidate', 'oth', false);

-- New Hampshire

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'nh', 'Maggie Hassan', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'nh', 'Donald Bolduc', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'nh', 'Other candidate', 'oth', false);

-- Alaska

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ak', 'Lisa Murcowski', 'rep', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ak', 'Kelly Tshibaka', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ak', 'Patricia Chesbro', 'dem', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ak', 'Buzz Kelley', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'ak', 'Other candidate', 'oth', false);


-- Hawaii

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'hi', 'Brian Schatz', 'dem', true);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'hi', 'Bob McDermott', 'rep', false);

insert into races(race_type, race_index, state_id, candidate_name, candidate_party, incumbent)
values (1, 0, 'hi', 'Other candidate', 'oth', false);