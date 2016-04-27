class TacticsController < ApplicationController
  before_filter :check_login

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

    if params[:type].blank?
       @tactics = Base::MtbTactics.where("tactic_type > 0 and genre = 1")
      .order("RAND()").limit(10)
    else
      if is_number params[:type]
        @tactics = Base::MtbTactics.where("tactic_type = #{params[:type]
          } and genre = 1")
        .order("RAND()").limit(10)
      elsif params[:type].to_s=='puzzle'
          @tactics = Base::MtbTactics.where("tactic_type > 0 and genre = 2")
        .order("RAND()").limit(10)
      else 
        
        @tactics = Base::MtbTactics.where("tactic_type = 2 and genre = 1")
        .order("RAND()").limit(10)
      end  
    end
    @user_rating = ApplicationHelper.current_user_rating(session)
  end

  def is_number(val)
    if val.to_f.to_s == val.to_s || val.to_i.to_s == val.to_s
      return true
    end
    return false
  end

  def update_rating
    # is_success:
    # user_rating:
    # user_rd:
    # user_vol:
    # puzzle_id:
    # puzzle_rating:
    # puzzle_rd: 
    # puzzle_vol:
    # raise params.to_json
    data = Hash.new
    data["result"] = "fail"
    data["result_tactic"] = "fail"

    user_rating = ApplicationHelper.current_user_rating(session)
    if user_rating.present?
      user_rating.rating = params[:user_rating]
      user_rating.rd = params[:user_rd]
      user_rating.vol = params[:user_vol]
      user_rating.point = user_rating.point + params[:user_point]
      if user_rating.save!
        data["result"] = "success"
      end
    end

    tactic = Base::MtbTactics.find(params[:puzzle_id])
    if tactic.present?
      tactic.rating = params[:puzzle_rating]
      tactic.rd = params[:puzzle_rd]
      tactic.vol = params[:puzzle_vol]
      tactic.success_count = tactic.success_count + params[:is_success]
      tactic.try_count = tactic.try_count + 1
      if tactic.save!
        data["result_tactic"] = "success"
      end
    end
    render :json => data
  end

  def tactic_ajax
    raise params.to_s
      @tactics = Base::MtbTactics.where("tactic_type = 3 and genre = 1")
      .order("RAND()").limit(10)
  end
  def tactic_four
      @tactics = Base::MtbTactics.where("tactic_type = 4 and genre = 1")
      .order("RAND()").limit(10)
  end

  def datainsert
  		@tactic = Base::MtbTactics.new
  end
	def elo_rating
    
  end
	#ajax-r tactics-tableruu data bicheh
	def tactics_update_ajax
	
    if params[:fen].present?
		  tactic = Base::MtbTactics.new
      tactic.fen =params[:fen]
      tactic.fes =params[:fes]
      tactic.info=params[:info]
      tactic.genre=1
      tactic.tactic_type=4
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
