import subprocess

def lambda_handler():
    subprocess.call(['python', 'src/data_flow.py', 'run'])
    return None