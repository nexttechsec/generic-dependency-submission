#### Utility commands for generating the manifest files
1) **Java**
   1) **Maven**
    ```shell
      mvn dependency:tree -DoutputType=graphml -DoutputFile=dependency.graphml
    ```

2) **Javascript**
   1) **Npm**
   2) 
   ```shell
      npm list --prod --all --json >> dependencies.json
   ```
3) **Python**
   1) **Pip**
   ```shell
       // in virtual environment
       pip install pipdeptree==2.3.3
       pipdeptree --exclude pip,pipdeptree,setuptools,wheel --json >> dependencies.json
   ```
