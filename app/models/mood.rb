class Mood < ActiveRecord::Base
  validates :happiness, presence: true
  validates :user, presence: true


  belongs_to :user
end
