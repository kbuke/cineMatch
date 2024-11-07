from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates 
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import Time 
from config import db, bcrypt
import re 


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

    serialize_rules=(
        "-film_genres.media",
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


#Create Tv Show Table
class TvShows(Media):
    __tablename__ = "tv_shows"

    @declared_attr
    def id(cls):
        return db.Column(db.Integer, db.ForeignKey('media_types.id'), primary_key=True)
    
    end_date=db.Column(db.DateTime, nullable=True)

    #Add relations (episodes)

    @validates("end_date")
    def validate_end_date(self, key, end_date):
        if self.release_date <= end_date:
            return end_date
        raise ValueError("End date can not be before premiere date")


#Create table for genres
class Genres(db.Model, SerializerMixin):
    table_name="genres"

    id=db.Column(db.Integer, primary_key=True)
    genre=db.Column(db.String, nullable=False)

    @validates("genre")
    def validate_genre(self, key, genre):
        existing_genre=db.session.query(Genres).filter_by(genre=genre).first()
        if existing_genre:
            raise ValueError("This genre alrerady exists")
        return genre 
    
    #Add relatonship (to media: many-to-many)
    film_genres=db.relationship("MediaGenres", backref="genre")

    serialize_rules=(
        "-film_genres.genre",
    )


class MediaGenres(db.Model, SerializerMixin):
    table_name="media_genres"

    id=db.Column(db.Integer, primary_key=True)
    media_id=db.Column(db.Integer, db.ForeignKey("media_types.id"))
    genre_id=db.Column(db.Integer, db.ForeignKey("genres.id"))
