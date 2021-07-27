--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)

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
-- Name: public.songs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."public.songs" (
    id integer NOT NULL,
    name text NOT NULL,
    "youtubeLink" text NOT NULL
);


--
-- Name: public.songs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."public.songs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: public.songs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."public.songs_id_seq" OWNED BY public."public.songs".id;


--
-- Name: songs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.songs (
    id integer NOT NULL,
    name text NOT NULL,
    "youtubeLink" text NOT NULL,
    score integer
);


--
-- Name: songs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.songs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: songs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.songs_id_seq OWNED BY public.songs.id;


--
-- Name: public.songs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.songs" ALTER COLUMN id SET DEFAULT nextval('public."public.songs_id_seq"'::regclass);


--
-- Name: songs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songs ALTER COLUMN id SET DEFAULT nextval('public.songs_id_seq'::regclass);


--
-- Data for Name: public.songs; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: songs; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: public.songs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."public.songs_id_seq"', 1, false);


--
-- Name: songs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.songs_id_seq', 1, false);


--
-- Name: public.songs public.songs_youtubeLink_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.songs"
    ADD CONSTRAINT "public.songs_youtubeLink_key" UNIQUE ("youtubeLink");


--
-- Name: public.songs songs_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."public.songs"
    ADD CONSTRAINT songs_pk PRIMARY KEY (id);


--
-- Name: songs songs_youtubeLink_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT "songs_youtubeLink_key" UNIQUE ("youtubeLink");


--
-- PostgreSQL database dump complete
--

