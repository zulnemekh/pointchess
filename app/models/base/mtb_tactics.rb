# coding: utf-8
class Base::MtbTactics < ActiveRecord::Base
 self.table_name = "mtb_tactics"
 attr_accessible :id, :fen, :fes, :info, :genre, :short_info, :tactic_type
                  
end