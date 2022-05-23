# Python

un-versioned symlinks `python`,`python-config`,`pip` etc.
pointing to `python3`、`python3-config`、`pip3` etc,
respectively have been installed `/usr/local/opt/python@3.9/libexec/bin`

You can install Python packages with `pip3 install <package>`
They will install into the site-package directory `/usr/local/lib/python3.9/site-packages`

tkinter is no longer included with this formula,but it is available separately
install tkinter use the command `brew install python-tk@3.9`

## Pipenv & Virtual Environments

The next step is to install Pipenv,so you can install dependencies and manage virtual environments.

A Virtual Environment is a tool to keep the dependencies required by differently projects in separate places,by creating virtual Python environment for them.It solves the "Project X depends on version 1.x but,Project Y needs 4.x" dilemma,and keeps your global site-packages clean and manageable

For example,you can work on a project which requires Django1.10 while also maintaining
a project which require Django1.8

So,onward!(以后)To the `Pipenv & Virtual Environment` docs
