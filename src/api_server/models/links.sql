CREATE TABLE crosver_table (
  id int PRIMARY KEY AUTO_INCREMENT,
  crosverLocation varchar(40),
  crosverDocks varchar(40),
  crosverComments varchar(255)
)
CHARACTER SET = utf8;

SELECT id, crosverLocation, crosverDocks, crosverComments
FROM crosver_table;

INSERT INTO crosver_table (crosverLocation, crosverDocks, crosverComments)
VALUES('т.к. №007 по вулиці Веселка', 'АКТ №4589877 від 8.25.2008', 'Встановленно задля фану');

select id, crosverLocation, crosverDocks, crosverComments
FROM crosver_table
WHERE id = 1;

CREATE TABLE bildings_table (
  id int PRIMARY KEY AUTO_INCREMENT,
  name_street_new varchar(30),
  name_street_old varchar(30),
  bilding_namber varchar(20),
  lat float,
  lng float,
  district varchar(20),
  comment varchar(2000),
  foto_url varchar(1000)
)
CHARACTER SET = utf8;

INSERT INTO street_table (name_street_new, comment)
VALUES('Предславинская', 'Метро "Палац Украина"');

CREATE TABLE place_table (
  id int PRIMARY KEY AUTO_INCREMENT,
  bilding_table_id int REFERENCES bilding_table(id),
  description_of_place varchar(1000),
  comment varchar(3000),
  foto_url varchar(1000)
)
CHARACTER SET = utf8;

CREATE TABLE switches_table (
  id int PRIMARY KEY AUTO_INCREMENT,
  place_table_id int REFERENCES place_table(id),
  alias varchar(100),
  ip_of_switch varchar(100),
  comment varchar(3000),
  foto_url varchar(1000),
  namber_of_ports int
)
CHARACTER SET = utf8;

CREATE TABLE ports_of_switch_table (
  id int PRIMARY KEY AUTO_INCREMENT,
  dates TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  switches_table_id int REFERENCES switches_table(id),
  namber_of_port int,
  comment varchar(3000)
)
CHARACTER SET = utf8;

CREATE TABLE type_of_connection_table (
  id int PRIMARY KEY AUTO_INCREMENT,
  type_of_connection varchar(1000),
  comment varchar(3000)

)
CHARACTER SET = utf8;

CREATE TABLE connection_table (
  id int PRIMARY KEY AUTO_INCREMENT,
  dates TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  place_table_id_1 int REFERENCES place_table(id),
  place_table_id_2 int REFERENCES place_table(id),
  type_of_connection_table_id int REFERENCES type_of_connection_table(id),
  abonent_teble_id int REFERENCES abonent_teble(id),
  comment varchar(3000)
)
CHARACTER SET = utf8;

CREATE TABLE abonent_table (
  id int PRIMARY KEY AUTO_INCREMENT,
  dates TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ports_of_switch_table_id int REFERENCES ports_of_switch_table(id),
  place_table_id int REFERENCES place_table(id),
  comment varchar(3000)
)
CHARACTER SET = utf8;

INSERT INTO bilding_table(name_street_id, bilding_namber,  lat, lng, comment)
VALUE (13, 28, 50.424373, 30.520549, 'Центральный офис');

SELECT * FROM street_table st
INNER JOIN bilding_table bt
ON st.id = bt.name_street_id
WHERE bt.name_street_id = 2;



INSERT INTO bilding_table(name_street_id, bilding_namber,  lat, lng, comment)
VALUE (1, 27, 50.437589, 30.545477, '');

ALTER TABLE bildings_table ADD COLUMN district varchar(20) AFTER comment;

CREATE TABLE platform_table (
  id int PRIMARY KEY AUTO_INCREMENT,
  dates TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  bildings_id int REFERENCES bildings_table(id),
  office_namber varchar(30),
  comment varchar(3000)
)
CHARACTER SET = utf8;

ALTER TABLE platform_table
ADD COLUMN floor varchar(30)

INSERT INTO platform_table (bildings_id, office_namber, floor, comment)
VALUES (1, "304", "3 этаж", "Коммент тест");

ALTER TABLE converter_table
ADD COLUMN range VARCHAR(15) AFTER type_of_converter;

ALTER TABLE converter_table
ADD COLUMN connector_type varchar(5);

CREATE TABLE foto_of_platform_table (
  id int PRIMARY KEY AUTO_INCREMENT,
  name_platform_id int REFERENCES platform_table(id),
  name_of_foto varchar(100),
  comment_foto varchar(300)
)
CHARACTER SET = utf8;

CREATE TABLE platform_table (
  id int PRIMARY KEY AUTO_INCREMENT,
  dates TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  bildings_id int REFERENCES bildings_table(id),
  office_namber varchar(30),
  entrance varchar(50),
  floor varchar(30),
  comment varchar(1000)
)
CHARACTER SET = utf8;

CREATE TABLE platform_table (
  id int PRIMARY KEY AUTO_INCREMENT,
  dates TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  bildings_id int REFERENCES bildings_table(id),
  office_namber varchar(30),
  entrance varchar(50),
  floor varchar(30),
  comment varchar(1000)
)
CHARACTER SET = utf8;

CREATE TABLE foto_of_optic_table (
  id int PRIMARY KEY AUTO_INCREMENT,
  name_platform_id int REFERENCES platform_table(id),
  fob_box_cross varchar(10),
  pig_teils varchar(5),
  sc_fc_lc varchar(5),
  name_of_foto_optic varchar(100),
  comment_optic varchar(300)
)
CHARACTER SET = utf8;

CREATE TABLE switch_table1 (
  id int PRIMARY KEY AUTO_INCREMENT,
  name_platform_id int REFERENCES platform_table(id),
  model varchar(30),
  number_of_ports varchar(40),
  alias varchar(20),
  ip_switch varchar(20),
  comment varchar(300)
)
CHARACTER SET = utf8;

CREATE TABLE converter_table (
  id int PRIMARY KEY AUTO_INCREMENT,
  name_platform_id int REFERENCES platform_table(id),
  model varchar(30),
  converter_SFP varchar(10),
  type_of_converter varchar(30),
  range_converter varchar(10),
  connector_type varchar(5),
  comment varchar(300)
)
CHARACTER SET = utf8;

CREATE TABLE UPS_table (
  id int PRIMARY KEY AUTO_INCREMENT,
  name_platform_id int REFERENCES platform_table(id),
  model varchar(30),
  comment varchar(300)
)
CHARACTER SET = utf8;

CREATE TABLE battery_table (
  id int PRIMARY KEY AUTO_INCREMENT,
  name_platform_id int REFERENCES platform_table(id),
  model varchar(30),
  capacity varchar(10),
  comment varchar(300)
)
CHARACTER SET = utf8;

CREATE TABLE optic_table (
  id int PRIMARY KEY AUTO_INCREMENT,
  name_platform_id int REFERENCES platform_table(id),
  fob_box_cross varchar(20),
  pig_teils varchar(5),
  sc_fc_lc varchar(5),
  comment_optic varchar(300)
)
CHARACTER SET = utf8;

ALTER TABLE bildings_table
ADD COLUMN actual BOOLEAN DEFAULT true;

ALTER TABLE optic_table
ADD COLUMN actual BOOLEAN DEFAULT true;

UPDATE bildings_table SET actual = 0 WHERE id = 2;

CREATE TABLE radio_table (
  id int PRIMARY KEY AUTO_INCREMENT,
  dates TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  name_platform_id int REFERENCES platform_table(id),
  ssid varchar(20),
  country_code varchar(30),
  chanel_width varchar(30),
  Frequency varchar(20),
  firmware_version varchar(30),
  net_radio varchar(30),
  ip_radio varchar(30),
  gw_radio varchar(30),
  login varchar(30),
  passwd varchar(30),
  actual BOOLEAN DEFAULT true
)
CHARACTER SET = utf8;

ALTER TABLE radio_table
ADD COLUMN comment varchar(300);

CREATE TABLE transport_table (
  id int PRIMARY KEY AUTO_INCREMENT,
  dates TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  name_platform_id int REFERENCES platform_table(id),
  provider varchar(20),
  comments varchar(300),
  actual BOOLEAN DEFAULT true
)
CHARACTER SET = utf8;

CREATE TABLE ports_switch_table (
  id int PRIMARY KEY AUTO_INCREMENT,
  dates TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  port_namber int,
  switch_id int REFERENCES switch_table1(id),
  type_ports varchar(20),
  comments varchar(300),
  actual BOOLEAN DEFAULT true
)
CHARACTER SET = utf8;

INSERT INTO ports_switch_table (switch_id, port_namber)
VALUES (2, 1);

ALTER TABLE ports_switch_table
ADD COLUMN port_namber int AFTER dates;

select switch.alias, switch.ip_switch, ports.port_namber, ports.type_ports, ports.comments, ports.id
FROM switch_table1 AS switch
INNER JOIN ports_switch_table AS ports ON switch.id = ports.switch_id
WHERE ports.switch_id = 2;

CREATE TABLE connections_switch (
  id int PRIMARY KEY AUTO_INCREMENT,
  dates TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ports_id_1 int REFERENCES ports_switch_table(id),
  ports_id_2 int REFERENCES ports_switch_table(id),
  actual BOOLEAN DEFAULT true
)
CHARACTER SET = utf8;

INSERT INTO connections_switch (ports_id_1, ports_id_2)
VALUES (12, 19);

SELECT ports1.id, ports1.port_namber, ports1.switch_id, ports2.id, ports2.port_namber, ports2.switch_id
FROM connections_switch AS cons
INNER JOIN ports_switch_table AS ports1
ON cons.ports_id_1 = ports1.id
INNER JOIN ports_switch_table AS ports2
ON cons.ports_id_2 = ports2.id
WHERE cons.ports_id_1 = 10 OR cons.ports_id_2 = 10;

SELECT *
FROM connections_switch AS cons
 JOIN ports_switch_table AS ports1
ON cons.ports_id_1 = ports1.id
 JOIN ports_switch_table AS ports2
ON cons.ports_id_2 = ports2.id;

SELECT *
FROM connections_switch AS cons
 JOIN ports_switch_table AS ports1
ON cons.ports_id_1 = ports1.id
 JOIN switch_table1 AS switch
ON ports1.switch_id = switch.id
 JOIN ports_switch_table AS ports2
ON cons.ports_id_2 = ports2.id;

SELECT ports1.id, ports1.port_namber, ports1.switch_id, switch1.alias, switch1.ip_switch, ports2.id, ports2.port_namber, ports2.switch_id, switch2.alias, switch2.ip_switch
FROM connections_switch AS cons
 JOIN ports_switch_table AS ports1
ON cons.ports_id_1 = ports1.id
 JOIN switch_table1 AS switch1
ON ports1.switch_id = switch1.id
 JOIN ports_switch_table AS ports2
ON cons.ports_id_2 = ports2.id
 JOIN switch_table1 AS switch2
ON ports2.switch_id = switch2.id
WHERE switch1.id = 2 OR switch2.id = 2;


SELECT *
FROM ports_switch_table
WHERE switch_id = 2;

SELECT ports1.id, ports1.port_namber, ports1.switch_id, switch_table1.alias, ports2.id, ports2.port_namber, ports2.switch_id
FROM connections_switch AS cons
INNER JOIN ports_switch_table AS ports1
ON cons.ports_id_1 = ports1.id
JOIN ports1
ON switch_table1.id = ports1.switch_id
INNER JOIN ports_switch_table AS ports2
ON cons.ports_id_2 = ports2.id
WHERE cons.ports_id_1 = 10 OR cons.ports_id_2 = 10;

CREATE TABLE UkrTelecomDocuments (
    id int PRIMARY KEY AUTO_INCREMENT,
    dates TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    adress1 varchar(400),
    adress2 varchar(400),
    akt varchar(400),
    tu varchar(400),
    dog varchar(400),
    prog varchar(400),
    folder varchar(50),
    actual BOOLEAN DEFAULT true
)
CHARACTER SET = utf8;

ALTER TABLE UkrTelecomDocuments
ADD COLUMN prog varchar(400) AFTER dog;

CREATE TABLE UkrTelDocFoto (
    id int PRIMARY KEY AUTO_INCREMENT,
    dates TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ukrTel_id int REFERENCES UkrTelecomDocuments(id),
    typeOfDocs varchar(10),
    nameOfFoto varchar(1000),
    actual BOOLEAN DEFAULT true
)
CHARACTER SET = utf8;

INSERT INTO UkrTelecomDocuments (adress1, adress2, akt, tu, dog, folder)
VALUES ('Вул. Предславинська ТК №162А', 'Вул. Велика Васильківська буд. №26', '№1162 від 11.07.12 р.', '№ 04-7/2167 від 17.06.2011', '№ 2110833 від 08 листопада 2011 р.', '1-2');
