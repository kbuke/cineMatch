from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates 
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import Time 
from config import db, bcrypt
import re 
from sqlalchemy.ext.hybrid import hybrid_property


#Add umbrella model for media (films, tv)
class Media(db.Model, SerializerMixin):
    __tablename__ = "media_types"

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    sub_title=db.Column(db.String, nullable=True)
    poster=db.Column(db.String, nullable=False)
    release_date=db.Column(db.DateTime, nullable=False)
    summary=db.Column(db.String, nullable=False)
    media_type=db.Column(db.String, nullable=False)
    background_image=db.Column(db.String, nullable=True)
    origin_country=db.Column(db.String, nullable=False)

    #Set up relations (genres, screenshots, studio, actors, directors)
    film_genres=db.relationship("MediaGenres", backref="media")
    film_cast=db.relationship("MediaCast", backref="media")

    serialize_rules=(
        "-film_genres.media",
        "-film_genres.genre.film_genres",
        "-film_genres.genre.user_genres",
        "-film_cast.media",
        "-film_cast.user",
    )

    type = db.Column(db.String(50))

    __mapper_args__ = {
        'polymorphic_on': type,
        'polymorphic_identity': 'media'
    }
    
    #State Tv Shows and Movies sub-categories
    ALLOWED_MEDIA=("TV Programme", "Movie")

    #Validations
    @validates("media_type")
    def validate_media(self, key, media):
        if media in self.ALLOWED_MEDIA:
            return media 
        raise ValueError(f"The media type must be one of {', '.join(self.ALLOWED_MEDIA)}")
    
    @validates("summary")
    def validate_summary(self, key, summary):
        if 20 <= len(summary) <= 250:
            return summary
        raise ValueError("Summary must be between 20 and 250 characthers.")


#Create Movies Table
class Movies(Media):
    __tablename__ = "movies"

    @declared_attr
    def id(cls):
        return db.Column(db.Integer, db.ForeignKey('media_types.id'), primary_key=True)
    
    run_time_hours=db.Column(db.Integer, nullable=False)
    run_time_minutes=db.Column(db.Integer, nullable=False)

    @validates("run_time_minutes")
    def validate_minutes(self, key, minutes):
        if 0 <= minutes <= 59:
            return minutes 
        raise ValueError("Can not have more minutes than 59")

    __mapper_args__={
        'polymorphic_identity': "Movies"
    }
    
    


#Create Tv Show Table
class TvShows(Media):
    __tablename__ = "tv_shows"
    __mapper_args__={
        "polymorphic_identity": "tv_show"
    }

    @declared_attr
    def id(cls):
        return db.Column(db.Integer, db.ForeignKey('media_types.id'), primary_key=True)
    
    end_date=db.Column(db.DateTime, nullable=True)

    #Add relations (episodes)

    @validates("end_date")
    def validate_end_date(self, key, end_date):
        if self.release_date and self.release_date <= end_date:
            return end_date
        raise ValueError("End date can not be before premiere date")
    
    __mapper_args__ = {
        'polymorphic_identity': 'Tv_shows'
    }


#Create table for genres
class Genres(db.Model, SerializerMixin):
    __tablename__="genres"

    id=db.Column(db.Integer, primary_key=True)
    genre=db.Column(db.String, nullable=False)
    image=db.Column(db.String, nullable=False, server_default="")

    @validates("genre")
    def validate_genre(self, key, genre):
        existing_genre=db.session.query(Genres).filter_by(genre=genre).first()
        if existing_genre:
            raise ValueError("This genre alrerady exists")
        return genre 
    
    #Add relatonship (to media: many-to-many)
    film_genres=db.relationship("MediaGenres", backref="genre")
    user_genres=db.relationship("UsersGenres", backref="genre")

    serialize_rules=(
        "-film_genres.genre",
        "-film_genres.media",
        "-user_genres.genre",
        "-user_genres.user",
    )

#Create table for medias genre
class MediaGenres(db.Model, SerializerMixin):
    __tablename__="media_genres"

    id=db.Column(db.Integer, primary_key=True)
    media_id=db.Column(db.Integer, db.ForeignKey("media_types.id"))
    genre_id=db.Column(db.Integer, db.ForeignKey("genres.id"))


#Create table for users
class Users(db.Model, SerializerMixin):
    __tablename__="users"

    id=db.Column(db.Integer, primary_key=True)
    email=db.Column(db.String, nullable=False)
    first_name=db.Column(db.String, nullable=False)
    last_name=db.Column(db.String, nullable=False)
    _password_hash=db.Column(db.String, nullable=False)
    user_type=db.Column(db.String, nullable=False)
    city=db.Column(db.String, nullable=True)
    login_count=db.Column(db.Integer, default=0)
    interests=db.Column(db.Boolean, default=False)

    #Set up relations (followers/following, genre interests, reviews, watchlist)
    genres=db.relationship("UsersGenres", backref="user")
    profile_picture = db.relationship("UserPictures", backref="user", uselist=False)
    film_cast=db.relationship("MediaCast", backref="user")
    
    # Set up relationships for followers and following
    followers = db.relationship(
        "UserFollows",
        foreign_keys="[UserFollows.follows_id]",
        backref="followed_user",
        cascade="all, delete-orphan"
    )
    following = db.relationship(
        "UserFollows",
        foreign_keys="[UserFollows.follower_id]",
        backref="follower_user",
        cascade="all, delete-orphan"
    )

    # Automatically assign a default profile picture
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if not self.profile_picture:
            self.profile_picture = UserPictures(
                picture_route="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
            )


    serialize_rules=(
        "-genres.user",
        "-genres.genre.user_genres",
        "-genres.genre.film_genres",
        "-profile_picture.user",
        "-followers.followed_user.followers",
        "-followers.follower_user",
        "-following.follower_user",
        "-following.followed_user.following",
        "-film_cast.user",
        "-film_cast.media",
    )


    type=db.Column(db.String(50))

    __mapper_args__={
        "polymorphic_on": type,
        "polymorphic_identity": "user"
    }

    #Validate account types
    ALLOWED_USERS=("Viewer", "Actor", "Director", "Admin")

    @validates("user_type")
    def validate_user_type(self, key, account_type):
        if account_type in self.ALLOWED_USERS:
            return account_type
        raise ValueError(f"The account type must be one of {', '.join(self.ALLOWED_USERS)}")

    #Password hashing and authentication
    @hybrid_property
    def password_hash(self):
        raise AttributeError("password: write only attribute")
    
    @password_hash.setter
    def password_hash(self, password):
        self._password_hash=bcrypt.generate_password_hash(password).decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)
    
    @validates("email")
    def validate_email(self, key, value):
        if "@" and "." not in value:
            raise ValueError("Please enter a valid email address")
        return value

class Viewers(Users):
    __tablename__="viewers"

    @declared_attr
    def id(cls):
        return db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    
    __mapper_args__={
        "polymorphic_identity": "Viewers"
    }

class Actors(Users):
    __tablename__="actors"

    @declared_attr
    def id(cls):
        return db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    
    __mapper_args__={
        "polymorphic_identity": "Actors"
    }

    #Set up relations (tv shows and movies theyve directed and starred in)

class Director(Users):
    __tablename__="directors"

    @declared_attr
    def id(cls):
        return db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    
    __mapper_args__={
        "polymorphic_identity": "Directors"
    }

    #Set up relations (tv shows and movies theyve directed and starred in)



#Connect users to their favourite genres
class UsersGenres(db.Model, SerializerMixin):
    __tablename__="users_genres"

    id=db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer, db.ForeignKey("users.id"))
    genre_id=db.Column(db.Integer, db.ForeignKey("genres.id"))


#Set up profile picture model
class UserPictures(db.Model, SerializerMixin):
    __tablename__="userPics"

    id=db.Column(db.Integer, primary_key=True)

    picture_route = db.Column(db.String, nullable=False, server_default="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg")

    #Add relations
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)


#Set up a user follows model
class UserFollows(db.Model, SerializerMixin):
    __tablename__="follows"

    id=db.Column(db.Integer, primary_key=True)

    follower_id=db.Column(db.Integer, db.ForeignKey("users.id"))
    follows_id=db.Column(db.Integer, db.ForeignKey("users.id"))

    # Enforce uniqueness to prevent duplicate follows
    __table_args__ = (db.UniqueConstraint("follower_id", "follows_id", name="unique_follows"),)


#Set up a table for films cast
class MediaCast(db.Model, SerializerMixin):
    __tablename__="media_cast"

    id=db.Column(db.Integer, primary_key=True)
    media_id=db.Column(db.Integer, db.ForeignKey("media_types.id"))
    actor_id=db.Column(db.Integer, db.ForeignKey("users.id"))
    billing=db.Column(db.Integer, nullable=False)


    

