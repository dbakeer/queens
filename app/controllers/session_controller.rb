class SessionController < ApplicationController

  def create
    user = User.find_by(email: user_params[:email])

    if user && user.authenticate(user_params[:password])


      token = SecureRandom.urlsafe_base64

      session[:session_token] = token
      user.update(session_token: token)

      flash[:message] = "Thanks for logging in, sinner."
      redirect_to application_angular_path
    else
      flash[:message] = "Email / Password combo does not exist!"
      redirect_to root_path
    end

    
  end

def destroy
  log_out!

  redirect_to root_path
end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end

end
