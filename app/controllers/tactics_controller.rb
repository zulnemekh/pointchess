class TacticsController < ApplicationController
  def index
    	@tactics = Base::MtbTactics.all
  end
  
  def edit
  	@tactic = Base::MtbTactics.find(params[:id])
  end

  def update
    @tactic = Base::MtbTactics.find(params[:base_mtb_tactics][:id])
    @tactic.update(params[:base_mtb_tactics])
    @tactic.save!
    redirect_to :action => 'index'
  end


  def datainsert
  		@tactic = Base::MtbTactics.new
  end

  def create
    todo = Base::MtbTactics.new(params[:base_mtb_problems])
    todo.save!
    redirect_to :action => 'index'
  end

end
