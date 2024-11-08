"""initial migration

Revision ID: ceabeed695b6
Revises: 
Create Date: 2024-11-07 19:43:07.073505

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ceabeed695b6'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('genres',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('genre', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('media_types',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('sub_title', sa.String(), nullable=True),
    sa.Column('poster', sa.String(), nullable=False),
    sa.Column('release_date', sa.DateTime(), nullable=False),
    sa.Column('summary', sa.String(), nullable=False),
    sa.Column('media_type', sa.String(), nullable=False),
    sa.Column('background_image', sa.String(), nullable=True),
    sa.Column('origin_country', sa.String(), nullable=False),
    sa.Column('type', sa.String(length=50), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('media_genres',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('media_id', sa.Integer(), nullable=True),
    sa.Column('genre_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['genre_id'], ['genres.id'], name=op.f('fk_media_genres_genre_id_genres')),
    sa.ForeignKeyConstraint(['media_id'], ['media_types.id'], name=op.f('fk_media_genres_media_id_media_types')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('movies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('run_time_hours', sa.Integer(), nullable=False),
    sa.Column('run_time_minutes', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['media_types.id'], name=op.f('fk_movies_id_media_types')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tv_shows',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('end_date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['id'], ['media_types.id'], name=op.f('fk_tv_shows_id_media_types')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tv_shows')
    op.drop_table('movies')
    op.drop_table('media_genres')
    op.drop_table('media_types')
    op.drop_table('genres')
    # ### end Alembic commands ###
