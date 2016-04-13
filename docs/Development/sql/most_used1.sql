SELECT count(*) FROM titan_clan.mtb_tactics;
SELECT * FROM titan_clan.mtb_tactics order by id desc;
SELECT * FROM titan_clan.mtb_tactics where LENGTH(fes)=18 order by id desc;
SELECT count(*) FROM titan_clan.mtb_tactics where LENGTH(fes)<20 order by id desc;

SELECT * FROM titan_clan.mtb_tactics where fes like '%(%' order by id desc;

UPDATE mtb_tactics SET tactic_type='-1' WHERE fes like '%(%' ;
SELECT * FROM titan_clan.mtb_tactics where tactic_type!='-1' and fes like '%(%' order by id desc;

SELECT * FROM mtb_tactics where tactic_type = 2 ORDER BY RAND() LIMIT 100;

SELECT *
  FROM mtb_tactics AS r1 JOIN
       (SELECT CEIL(RAND() *
                     (SELECT MAX(id)
                        FROM mtb_tactics)) AS id)
        AS r2
 WHERE r1.id >= r2.id
 ORDER BY r1.id ASC
 LIMIT 10
 
 