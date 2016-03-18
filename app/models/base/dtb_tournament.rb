# coding: utf-8
class Base::DtbTournament < ActiveRecord::Base
 self.table_name = "dtb_tournament"
 attr_accessible :id, :title, :genre_id, :user_id, :description, :photo, 
 :views, :follows, :likes, :created_at, :ended_at, :status
                  
end