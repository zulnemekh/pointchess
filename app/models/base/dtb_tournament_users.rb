# coding: utf-8
class Base::DtbTournamentUsers < ActiveRecord::Base
 self.table_name = "dtb_tournament_users"
 attr_accessible :id, :user_id, :tournament_id, :joined_at, :status
                  
end