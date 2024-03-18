--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(30) NOT NULL,
    description text,
    is_spherical boolean,
    age_in_million_of_years integer
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(30) NOT NULL,
    orbital_period_days integer NOT NULL,
    planet_id integer NOT NULL,
    has_atmosphere boolean
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(30) NOT NULL,
    light_years_from_earth numeric(15,10),
    is_life boolean,
    star_id integer
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(30) NOT NULL,
    description text,
    tempreture_kelvin numeric(8,2),
    galaxy_id integer
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Milky Way', 'The Milky Way is the galaxy that contains our Solar System.', true, 13000);
INSERT INTO public.galaxy VALUES (2, 'Andromeda', 'The Andromeda Galaxy is the closest spiral galaxy to the Milky Way.', true, 10000);
INSERT INTO public.galaxy VALUES (3, 'Messier 87', 'Messier 87 is a supergiant elliptical galaxy in the constellation Virgo.', false, 60000);
INSERT INTO public.galaxy VALUES (4, 'Triangulum', 'The Triangulum Galaxy is a spiral galaxy in the constellation Triangulum.', true, 5000);
INSERT INTO public.galaxy VALUES (5, 'Sombrero', 'The Sombrero Galaxy is an unbarred spiral galaxy in the constellation Virgo.', true, 11000);
INSERT INTO public.galaxy VALUES (6, 'Whirlpool', 'The Whirlpool Galaxy is an interacting grand-design spiral galaxy.', true, 23000);


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (41, 'Luna', 27, 1, true);
INSERT INTO public.moon VALUES (42, 'Alpha Centauri Bb Moon', 10, 2, false);
INSERT INTO public.moon VALUES (43, 'Proxima Centauri b Moon', 15, 3, false);
INSERT INTO public.moon VALUES (44, 'Betelgeuse b Moon', 20, 4, true);
INSERT INTO public.moon VALUES (45, 'Antares b Moon', 25, 5, true);
INSERT INTO public.moon VALUES (46, 'Triangulum Planet A Moon', 30, 6, NULL);
INSERT INTO public.moon VALUES (47, 'M106-ECO Planet A Moon', 35, 7, NULL);
INSERT INTO public.moon VALUES (48, 'Whirlpool Planet A Moon', 40, 8, NULL);
INSERT INTO public.moon VALUES (49, 'Whirlpool Planet B Moon', 45, 9, NULL);
INSERT INTO public.moon VALUES (50, 'Whirlpool Planet C Moon', 50, 10, NULL);
INSERT INTO public.moon VALUES (51, 'Whirlpool Planet D Moon', 55, 11, NULL);
INSERT INTO public.moon VALUES (52, 'Whirlpool Planet E Moon', 60, 12, NULL);
INSERT INTO public.moon VALUES (53, 'Tatooine I', 300, 10, true);
INSERT INTO public.moon VALUES (54, 'Tatooine II', 350, 10, false);
INSERT INTO public.moon VALUES (55, 'Endor I', 400, 4, true);
INSERT INTO public.moon VALUES (56, 'Endor II', 450, 4, false);
INSERT INTO public.moon VALUES (57, 'Hoth I', 500, 12, true);
INSERT INTO public.moon VALUES (58, 'Hoth II', 550, 12, false);
INSERT INTO public.moon VALUES (59, 'Naboo I', 600, 11, true);
INSERT INTO public.moon VALUES (60, 'Naboo II', 650, 11, false);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'Earth', 0.0000158130, true, 1);
INSERT INTO public.planet VALUES (2, 'Alpha Centauri Bb', 0.0000000450, false, 3);
INSERT INTO public.planet VALUES (3, 'Proxima Centauri b', 0.0000042400, true, 4);
INSERT INTO public.planet VALUES (4, 'Betelgeuse b', 0.0000031900, false, 5);
INSERT INTO public.planet VALUES (5, 'Antares b', 0.0000555550, false, 6);
INSERT INTO public.planet VALUES (6, 'Triangulum Planet A', 0.0000500000, NULL, 7);
INSERT INTO public.planet VALUES (7, 'M106-ECO Planet A', 0.0001000000, NULL, 8);
INSERT INTO public.planet VALUES (8, 'Whirlpool Planet A', 0.0001000000, NULL, 9);
INSERT INTO public.planet VALUES (9, 'Whirlpool Planet B', 0.0002000000, NULL, 9);
INSERT INTO public.planet VALUES (10, 'Whirlpool Planet C', 0.0003000000, NULL, 9);
INSERT INTO public.planet VALUES (11, 'Whirlpool Planet D', 0.0004000000, NULL, 9);
INSERT INTO public.planet VALUES (12, 'Whirlpool Planet E', 0.0005000000, NULL, 9);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'Sun', 'The Sun is the star at the center of the Solar System.', 5778.00, 1);
INSERT INTO public.star VALUES (2, 'Sirius', 'Sirius is the brightest star in the night sky.', 9940.00, 1);
INSERT INTO public.star VALUES (3, 'Alpha Centauri A', 'Alpha Centauri A is the primary component of the Alpha Centauri system.', 5790.00, 2);
INSERT INTO public.star VALUES (4, 'Proxima Centauri', 'Proxima Centauri is a small and faint red dwarf star.', 3042.00, 2);
INSERT INTO public.star VALUES (5, 'Betelgeuse', 'Betelgeuse is a red supergiant star in the constellation of Orion.', 3700.00, 3);
INSERT INTO public.star VALUES (6, 'Antares', 'Antares is a red supergiant star in the constellation of Scorpius.', 3400.00, 3);
INSERT INTO public.star VALUES (7, 'Triangulum Star F', 'Hypothetical star in the Triangulum Galaxy.', 5500.00, 4);
INSERT INTO public.star VALUES (8, 'M106-ECO', 'Hypothetical star in the Sombrero Galaxy.', 5800.00, 5);
INSERT INTO public.star VALUES (9, 'SN_2011DH', 'Supernova event in the Whirlpool Galaxy.', NULL, 6);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 6, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 60, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 12, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 9, true);


--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_key UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_name_key UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_key UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: galaxy unique_name; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT unique_name UNIQUE (name);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

