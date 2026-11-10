
import subprocess, os, datetime, shutil

repo_dir = r'D:\projects\portfolio\shadport'
backup_dir = os.path.join(repo_dir, '.backup_state')

def run(cmd, env=None):
    res = subprocess.run(cmd, cwd=repo_dir, capture_output=True, text=True, env=env or os.environ, shell=True)
    if res.returncode != 0:
        print(f'Error running: {cmd}\nStdout: {res.stdout}\nStderr: {res.stderr}')
        raise RuntimeError(f'Command failed: {cmd}')
    return res.stdout.strip()

print('Helper ready')
