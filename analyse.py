import os

def list_code_files(root_dir, output_file, ignore_dirs=None, file_extensions=None):
    """
    Parcourt un projet pour lister les fichiers de code et enregistre les chemins dans un fichier texte.
    
    :param root_dir: Répertoire racine du projet
    :param output_file: Chemin du fichier de sortie
    :param ignore_dirs: Liste des répertoires à ignorer
    :param file_extensions: Extensions de fichiers à inclure
    """
    if ignore_dirs is None:
        ignore_dirs = ['node_modules', '.git', 'dist', 'build']
    if file_extensions is None:
        file_extensions = ['.js', '.jsx', '.ts', '.tsx', '.py', '.html', '.css', '.scss']

    with open(output_file, 'w') as output:
        for root, dirs, files in os.walk(root_dir):
            # Exclure les répertoires à ignorer
            dirs[:] = [d for d in dirs if d not in ignore_dirs]
            for file in files:
                # Inclure uniquement les fichiers avec les extensions spécifiées
                if any(file.endswith(ext) for ext in file_extensions):
                    output.write(os.path.join(root, file) + '\n')

if __name__ == "__main__":
    # Chemin du répertoire racine de votre projet
    root_directory = input("Entrez le chemin vers le dossier racine de votre projet : ").strip()
    
    # Chemin du fichier de sortie
    output_file_path = os.path.join(root_directory, "liste_fichiers_code.txt")
    
    # Exécuter la fonction
    list_code_files(root_directory, output_file_path)

    print(f"Liste des fichiers de code enregistrée dans : {output_file_path}")
