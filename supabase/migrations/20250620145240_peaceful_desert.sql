/*
  # Create career analysis table

  1. New Tables
    - `career_analysis`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `degree` (text)
      - `skills` (text)
      - `goals` (text)
      - `analysis_result` (text, JSON string)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `career_analysis` table
    - Add policy for users to manage their own analysis data
*/

CREATE TABLE IF NOT EXISTS career_analysis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  degree text,
  skills text,
  goals text,
  analysis_result text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE career_analysis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own career analysis"
  ON career_analysis
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);