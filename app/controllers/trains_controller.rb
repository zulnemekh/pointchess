class TrainsController < ApplicationController
  before_action :set_train, only: [:show, :edit, :update, :destroy]
  respond_to :html

  def index
    @trains = Train.all
    respond_with(@trains)
  end

  def computerplay
    # render :layout => false
  end
  def computer_not_piece
    # render :layout => false
  end
  def playcenter
    # render :layout => false
  end
  def playgame
    # render :layout => false
  end
  def analyse
    # render :layout => false
  end
  def pgnviewer
    # render :layout => false
  end
  def show
    respond_with(@train)
  end

  def new
    @train = Train.new
    respond_with(@train)
  end

  def edit
  end

  def create
    @train = Train.new(train_params)
    @train.save
    respond_with(@train)
  end

  def update
    @train.update(train_params)
    respond_with(@train)
  end

  def destroy
    @train.destroy
    respond_with(@train)
  end

  private
    def set_train
      @train = Train.find(params[:id])
    end

    def train_params
      params.require(:train).permit(:title, :text_data, :pgn_type, :insert_admin)
    end
end
