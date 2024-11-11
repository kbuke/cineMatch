from flask import request, make_response, session, render_template

from flask_restful import Resource

from config import app, db, api, os

from models import Media, Movies, TvShows, Users, Genres, UsersGenres

class AllMedia(Resource):
    def get(self):
        all_media=[media.to_dict() for media in Media.query.all()]
        return all_media, 200 


class AllFilms(Resource):
    def get(self):
        film=[films.to_dict() for films in Movies.query.all()]
        return film, 200

class AllShows(Resource):
    def get(self):
        show=[shows.to_dict() for shows in TvShows.query.all()]
        return show, 200

class AllGenres(Resource):
    def get(self):
        genre=[genres.to_dict() for genres in Genres.query.all()]
        return genre, 200

class AllUsers(Resource):
    def get(self):
        users = [user.to_dict() for user in Users.query.all()]
        return users, 200

    def post(self):
        json = request.get_json()
        try:
            # Check if the email already exists
            if Users.query.filter_by(email=json.get("newUserEmail")).first():
                return {"error": "Email already exists"}, 400

            new_user = Users(
                email=json.get("newUserEmail"),
                first_name=json.get("newUserFirstName"),
                last_name=json.get("newUserLastName"),
                user_type=json.get("newUserType"),
                city=json.get("newUserCity")
            )
            new_user.password_hash = json.get("newUserPassword")
            db.session.add(new_user)
            db.session.commit()
            return new_user.to_dict(), 201
        except ValueError as e:
            return {"error": [str(e)]}, 400
        except IntegrityError:
            db.session.rollback()
            return {"error": "A database error occurred."}, 500
        

class Login(Resource):
    def post(self):
        json=request.get_json()
        # breakpoint()
        email=json.get("userEmail", "").strip()
        password=json.get("userPassword")

        if not email or not password:
            return {"error": "Email and Password required"}, 400
        
        user = Users.query.filter(Users.email == email).first()
        print(f"Queried user: {user}")

        if user and user.authenticate(password):
            session["user_id"] = user.id

            user.login_count += 1
            db.session.commit()

            response = make_response(user.to_dict())
            response.status_code = 200 

            return response
        
        return {"error": "Invalid email or password"}, 401


class CheckSession(Resource):
    def get(self):
        user_id=session.get("user_id")
        if user_id:
            user = Users.query.filter(Users.id == user_id).first()
            if user:
                return user.to_dict(), 200
        return {"message": "Unauthorized user"}, 401


class UserFaveGenres(Resource):
    def get(self):
        fave_genres = [fave_genre.to_dict(rules=(
            "-genre",
            "-user",
        )) for fave_genre in UsersGenres.query.all()]
        return fave_genres, 200
    
    def post(self):
        json=request.get_json()
        try:
            new_user_genre = UsersGenres(
                user_id=json.get("userId"),
                genre_id=json.get("genreId")
            )
            db.session.add(new_user_genre)
            db.session.commit()
            return new_user_genre.to_dict(), 201
        except ValueError as e:
            return{
                "error": [str(e)]
            }, 400
        

api.add_resource(AllMedia, '/media')
api.add_resource(AllFilms, '/films')
api.add_resource(AllShows, '/shows')
api.add_resource(AllGenres, '/genres')
api.add_resource(AllUsers, '/users')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/check_session')
api.add_resource(UserFaveGenres, '/user_genres')

if __name__ == "__main__":
    app.run(port=5555, debug=True)