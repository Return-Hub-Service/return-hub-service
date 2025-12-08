-- Seed data for user table
INSERT INTO public.user (email, name) VALUES
    ('john.doe@example.com', 'John Doe'),
    ('jane.smith@example.com', 'Jane Smith'),
    ('bob.johnson@example.com', 'Bob Johnson'),
    ('alice.williams@example.com', 'Alice Williams'),
    ('charlie.brown@example.com', 'Charlie Brown'),
    ('diana.davis@example.com', 'Diana Davis'),
    ('eric.miller@example.com', 'Eric Miller'),
    ('fiona.wilson@example.com', 'Fiona Wilson'),
    ('george.moore@example.com', 'George Moore'),
    ('hannah.taylor@example.com', 'Hannah Taylor')
ON CONFLICT (email) DO NOTHING;
