# coding: utf-8
class Base::DtbUserRating < ActiveRecord::Base
 self.table_name = "dtb_user_rating"
 attr_accessible :id, :user_id, :rating, :vol, :rd
                  
end