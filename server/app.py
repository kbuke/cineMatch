from flask import request, make_response, session, render_template

from flask_restful import Resource

from config import app, db, api, os

from werkzeug.utils import secure_filename

from flask import url_for, send_from_directory

from models import Media, Movies, TvShows, Users, Genres, UsersGenres, UserPictures, UserFollows, MediaGenres, MediaCast

from datetime import datetime

class AllMedia(Resource):
    def get(self):
        all_media=[media.to_dict() for media in Media.query.all()]
        return all_media, 200 


class AllFilms(Resource):
    def get(self):
        film=[films.to_dict() for films in Movies.query.all()]
        return film, 200

    def post(self):
        json=request.get_json()
        try:
            new_film = Movies(
                name=json.get("newFilmTitle"),
                sub_title=json.get("newFilmSubTitle"),
                poster=json.get("newFilmPoster"),
                release_date=datetime.strptime(json.get("newFilmReleaseDate"), '%Y-%m-%d'),
                summary=json.get("newFilmSummary"),
                media_type=json.get("mediaType"),
                background_image=json.get("newfilmBackground"), 
                origin_country=json.get("filmCountry"),
                run_time_hours=int(json.get("filmHour")),
                run_time_minutes=int(json.get("filmMinute"))
            )
            db.session.add(new_film)
            db.session.commit()
            return new_film.to_dict(), 201 
        except ValueError as e:
            return{"error": [str(e)]}, 400
    
class FilmId(Resource):
    def get(self, id):
        films = Movies.query.filter(Movies.id==id).first()
        if films:
            return make_response(films.to_dict(), 201)
        return {"error": "Film not found"}

class AllShows(Resource):
    def get(self):
        show=[shows.to_dict() for shows in TvShows.query.all()]
        return show, 200

class AllGenres(Resource):
    def get(self):
        genre=[genres.to_dict() for genres in Genres.query.all()]
        return genre, 200
    
    def post(self):
        json=request.get_json()
        try:
            if Genres.query.filter_by(genre=json.get("newGenre")).first():
                return {"error": "Genre already exists"}, 400 
            
            new_genre = Genres(
                genre=json.get("newGenre"),
                image=json.get("newGenreImg")
            )
            db.session.add(new_genre)
            db.session.commit()
            return new_genre.to_dict(), 201
        except ValueError as e:
            return {"error": [str(e)]}, 400

class GenreId(Resource):
    def get(self, id):
        genres = Genres.query.filter(Genres.id==id).first()
        if genres:
            return make_response(genres.to_dict(), 201)
        return {"error": "Genre not found"}
    
    def delete(self, id):
        genres = Genres.query.filter(Genres.id==id).first()
        if genres:
            db.session.delete(genres)
            db.session.commit()
            return{
                "message": "Genre deleted"
            }, 200 
        return {
            "error": "Genre not found"
        }, 404
    
    def patch(self, id):
        data=request.get_json()
        genre_info = Genres.query.filter(Genres.id==id).first()
        if genre_info:
            try:
                for attr in data:
                    setattr(genre_info, attr, data[attr])
                db.session.add(genre_info)
                db.session.commit()
                return make_response(genre_info.to_dict(), 202)
            except ValueError:
                return{
                    "error": ["Validation Error"]
                }, 400
        return {
            "error": "Genre not found"
        }, 404

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

class UserId(Resource):
    def get(self, id):
        user_info = Users.query.filter(Users.id==id).first()
        if user_info:
            return user_info.to_dict(), 201
        return {
            "error": "user not found"
        }
    
    def patch(self, id):
        data=request.get_json()
        user_info = Users.query.filter(Users.id==id).first()
        if user_info:
            try:
                for attr in data:
                    setattr(user_info, attr, data[attr])
                db.session.add(user_info)
                db.session.commit()
                return make_response(user_info.to_dict(), 202)
            except ValueError:
                return{
                    "error": ["Validation Error"]
                }, 400
        return{
            "error": "User not found"
        }, 404
        

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


class LogOut(Resource):
    def delete(self):
        user_id = session.get('user_id')
        if user_id:
            session.pop('user_id')
            return {}, 204
        return {"message": "Unautjorized"}, 401


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

class UserFaveGenresId(Resource):
    def get(self, id):
        user_genres = UsersGenres.query.filter(UsersGenres.id==id).first()
        if user_genres:
            return make_response(user_genres.to_dict, 201)
        return {"error": "Relationship not found"}
    
    def delete(self, id):
        user_genre = UsersGenres.query.filter(UsersGenres.id==id).first()
        if user_genre:
            db.session.delete(user_genre)
            db.session.commit()
            return{
                "message": "Relationship Deleted"
            }, 200
        return {
            "error": "Relationship not found"
        }, 404

class ProfilePictures(Resource):
    def get(self):
        profile_pic_info = [picture.to_dict() for picture in UserPictures.query.all()]
        return profile_pic_info, 200
    
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'avif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class ProfilePicsId(Resource):
    def patch(self, id):
        profile_pic_info = UserPictures.query.filter(UserPictures.id == id).first()
        if not profile_pic_info:
            return {"error": "Profile picture not found"}, 404
        
        # Check if a file is in the request
        if "image" not in request.files:
            return {"message": "No file part"}, 400

        file = request.files["image"]
        if file.filename == "":
            return {"message": "No selected file"}, 400

        # Check file extension
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            file.save(file_path)

            # Update picture_route in database with the new file URL
            file_url = url_for('uploaded_file', filename=filename, _external=True)
            profile_pic_info.picture_route = file_url

            db.session.commit()
            return profile_pic_info.to_dict(), 200
        else:
            return {"message": "File type not allowed"}, 400

# Add the route to serve the uploaded files
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


class Followers(Resource):
    def get(self):
        follower=[followers.to_dict() for followers in UserFollows.query.all()]
        return follower, 200
    
    def post(self):
        json=request.get_json()
        try:
            new_follower=UserFollows(
                follower_id=json.get("followerId"),
                follows_id=json.get("followsId")
            )
            # breakpoint()
            db.session.add(new_follower)
            db.session.commit()
            return new_follower.to_dict(), 201
        except ValueError as e:
            return{
                "error": [str(e)]
            }, 400

class FollowersId(Resource):
    def get(self, id):
        followers = UserFollows.query.filter(UserFollows.id==id).first()
        if followers:
            return make_response(followers.to_dict(), 201)
        return {"error": "Relationship not found"}
    
    def delete(self, id):
        followers=UserFollows.query.filter(UserFollows.id==id).first()
        if followers:
            db.session.delete(followers)
            db.session.commit()
            return{
                "message": "Follow deleted"
            }, 200
        return {
            "error": "Relationship not found"
        }, 404

class FilmGenres(Resource):
    def get(self):
        all_film_genres=[genres.to_dict(rules=(
            "-media.type",
            "-genre.user_genres",
        )) for genres in MediaGenres.query.all()]
        return all_film_genres, 200 
    
    def post(self):
        json=request.get_json()
        try: 
            new_genre = MediaGenres(
                media_id=json.get("selectFilmId"),
                genre_id=json.get("genreId")
            )
            db.session.add(new_genre)
            db.session.commit()
            return new_genre.to_dict(), 201
        except ValueError as e:
            return{"error": [str(e)]}, 400

class FilmGenresId(Resource):
    def get(self):
        films_genres=MediaGenres.query.filter(MediaGenres.id==id).first()
        if films_genres:
            return make_response(films_genres.to_dict(), 201)
        return {"error": "Films genre not found"}
    
    def delete(self, id):
        films_genres=MediaGenres.query.filter(MediaGenres.id==id).first()
        if films_genres:
            db.session.delete(films_genres)
            db.session.commit()
            return{
                "message": "Films genre deleted"
            }, 200
        return {
            "error": "Films genre not found"
        }, 404

class FilmCast(Resource):
    def get(self):
        film_casts=[casts.to_dict(rules=(
            "-media.run_time_hours",
            "-media.name",
            "-media.type",
            "-media.summary",
            "-media.film_genres",
            "-followers",
            "-user.genres",
            "-user.followers",
        )) for casts in MediaCast.query.all()]
        return film_casts, 200
    
    def post(self):
        json=request.get_json()
        try:
            new_cast=MediaCast(
                media_id=json.get("selectFilmId"),
                actor_id=json.get("actorId"),
                billing=json.get("actorBilling")
            )
            db.session.add(new_cast)
            db.session.commit()
            return new_cast.to_dict(), 201
        except ValueError as e:
            return{"error": [str(e)]}, 400

class FilmCastId(Resource):
    def get(self, id):
        film_casts = MediaCast.query.filter(MediaCast.id==id).first()
        if film_casts:
            return make_response(film_casts.to_dict(), 201)
        return {"error": "Film cast member not found"}
    
    def delete(self, id):
        film_casts = MediaCast.query.filter(MediaCast.id==id).first()
        if film_casts:
            db.session.delete(film_casts)
            db.session.commit()
            return{
                "message": "Film Cast Member Deleted"
            }, 200
        return {
            "error": "Film Cast Member not found"
        }, 404

        

api.add_resource(AllMedia, '/media')

api.add_resource(AllFilms, '/films')
api.add_resource(FilmId, '/films/<int:id>')

api.add_resource(AllShows, '/shows')

api.add_resource(AllGenres, '/genres')
api.add_resource(GenreId, '/genres/<int:id>')

api.add_resource(AllUsers, '/users')
api.add_resource(UserId, '/users/<int:id>')

api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/check_session')

api.add_resource(LogOut, '/logout')

api.add_resource(UserFaveGenres, '/user_genres')
api.add_resource(UserFaveGenresId, '/user_genres/<int:id>')

api.add_resource(ProfilePictures, '/profilepics')
api.add_resource(ProfilePicsId, '/profilepics/<int:id>')

api.add_resource(Followers, '/followers')
api.add_resource(FollowersId, '/followers/<int:id>')

api.add_resource(FilmGenres, '/film_genres')
api.add_resource(FilmGenresId, '/film_genres/<int:id>')

api.add_resource(FilmCast, '/film_cast')
api.add_resource(FilmCastId, '/film_cast/<int:id>')

if __name__ == "__main__":
    app.run(port=5555, debug=True)