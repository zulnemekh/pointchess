-- dawhartasan tactics-g FEN file-r shalgah
select * from (SELECT id, fen, count(fen) as count FROM titan_clan.mtb_tactics group by fen) q where count > 1;


