# coding: utf-8
class Base::DtbTournamentUsers < ActiveRecord::Base
 self.table_name = "dtb_tournament_user"
 attr_accessible :id, :user_id, :user_name, :tournament_id, :joined_at, :status
                  
end