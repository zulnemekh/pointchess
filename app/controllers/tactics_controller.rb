class TacticsController < ApplicationController
  def index
    	@tactics = Base::MtbTactics.all.limit(100)
  end
  
  def edit
  	@tactic = Base::MtbTactics.find(params[:id])
  end

  def update
    @tactic = Base::MtbTactics.find(params[:base_mtb_tactics][:id])
    @tactic.update(params[:base_mtb_tactics])
    @tactic.save
    redirect_to :action => 'index'
  end

  def tactic
      @tactics = Base::MtbTactics.where("tactic_type = 2")
      .order("RAND()").limit(10)
  end

  def datainsert
  		@tactic = Base::MtbTactics.new
  end
	
	#ajax-r tactics-tableruu data bicheh
	def tactics_update_ajax
	
    if params[:fen].present?
		  tactic = Base::MtbTactics.new
      tactic.fen =params[:fen]
      tactic.fes =params[:fes]
      tactic.info=params[:info]
      tactic.genre=2
      tactic.save!
      render :text => tactic.fen.to_s+" | "+tactic.fen.to_s+" | "+tactic.fen.to_s
    else
      render :text => "hooson"
      return
    end

	end
  def create
    todo = Base::MtbTactics.new(params[:base_mtb_tactics])
    todo.save
    redirect_to :action => 'index'
  end

end
