# -*- coding: utf-8 -*-
"""
Genera el CV de Piero en PDF, en español y en inglés.

Por qué existe: el CV original venía de Europass y tenía cuatro fechas
marcadas como "Actual" que ya no lo eran. Editar el texto dentro de aquel PDF
habría descuadrado la maquetación, así que el documento se reconstruye desde
aquí. El contenido vive en este archivo: se corrige aquí y se vuelve a
generar, sin depender de ninguna web ni de ninguna plantilla.

Los dos idiomas salen del mismo molde a propósito. Si la maquetación viviera
por duplicado, cualquier arreglo habría que hacerlo dos veces y una de las dos
versiones se quedaría atrás sin que nadie se diera cuenta.

Decisiones que no se ven:
  - Una sola columna y texto real. Los filtros automáticos (ATS) leen el flujo
    del documento; cualquier maquetación en columnas les rompe el orden de
    lectura y el CV llega troceado.
  - Helvetica, que va incrustada en todo lector de PDF. Una fuente bonita que
    el lector no tenga se sustituye sola y descuadra el documento en el
    ordenador de quien lo recibe.
  - Sin fecha ni lugar de nacimiento. En la mayor parte de Europa son datos
    que no aportan y que abren la puerta al sesgo. El permiso de trabajo sí
    se queda: eso sí lo pregunta un reclutador.
  - Dos páginas. La tercera quedaba dos tercios en blanco, y eso en un CV se
    lee como descuido.

Uso (desde portfolio-v2/):  python tools/generar-cv.py
"""

import os
from reportlab import rl_config

# Sin esto reportlab mete la fecha de generación y un identificador aleatorio
# en cada PDF, así que regenerar sin cambiar nada produce archivos distintos y
# git los marca como modificados. Con invariant el mismo contenido da siempre
# los mismos bytes.
rl_config.invariant = 1

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table, TableStyle,
    KeepTogether, HRFlowable,
)

# --- Colores: los mismos tokens que el portafolio, en su versión clara ------
INK    = HexColor("#16161a")
INK_2  = HexColor("#45454e")
INK_3  = HexColor("#64646e")
SIGNAL = HexColor("#ab3d0c")
LINE   = HexColor("#cfc7b7")

PAGE_W, PAGE_H = A4
MARGIN = 15 * mm
CONTENT_W = PAGE_W - 2 * MARGIN

DASH = "&#8211;"    # guion corto, para rangos de fechas
EMDASH = "&#8212;"  # raya
DOT = "&nbsp;&#183;&nbsp;"

# --------------------------------------------------------------- estilos ---


def style(name, **kw):
    base = dict(fontName="Helvetica", fontSize=8.8, leading=12.1,
                textColor=INK_2, spaceAfter=0, spaceBefore=0)
    base.update(kw)
    return ParagraphStyle(name, **base)


S = {
    "name":     style("name", fontName="Helvetica-Bold", fontSize=20,
                      leading=23, textColor=INK, spaceAfter=3),
    "role":     style("role", fontSize=10.5, leading=14, textColor=SIGNAL,
                      spaceAfter=7),
    "contact":  style("contact", fontSize=8.6, leading=12.4, textColor=INK_3),
    "section":  style("section", fontName="Helvetica-Bold", fontSize=9,
                      leading=11, textColor=INK),
    "jobtitle": style("jobtitle", fontName="Helvetica-Bold", fontSize=10,
                      leading=13, textColor=INK),
    "jobmeta":  style("jobmeta", fontSize=8.6, leading=12, textColor=INK_3),
    "dates":    style("dates", fontSize=8.6, leading=12, textColor=SIGNAL,
                      alignment=2),
    "note":     style("note", fontSize=8.8, leading=12.6, textColor=INK_3),
    "body":     style("body", fontSize=8.8, leading=12.1, alignment=TA_JUSTIFY),
    "bullet":   style("bullet", fontSize=8.8, leading=12.1, leftIndent=9,
                      bulletIndent=0, spaceAfter=1.1),
}

FLAT = [
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
]


def section(title):
    """Encabezado de sección: título y regla, como en el sitio."""
    t = Table([[Paragraph(title.upper(), S["section"])]], colWidths=[CONTENT_W])
    t.setStyle(TableStyle(FLAT + [
        ("LINEBELOW", (0, 0), (-1, -1), 0.6, LINE),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
    ]))
    return [Spacer(1, 8), t, Spacer(1, 5)]


def job(title, org, dates, place, bullets, note=None):
    """Un puesto. KeepTogether evita que se parta entre páginas."""
    head = Table(
        [[Paragraph(title, S["jobtitle"]), Paragraph(dates, S["dates"])]],
        colWidths=[CONTENT_W * 0.72, CONTENT_W * 0.28],
    )
    head.setStyle(TableStyle(FLAT + [
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
    ]))

    out = [head, Paragraph(org + DOT + place, S["jobmeta"])]
    if note:
        out += [Spacer(1, 3), Paragraph(note, S["note"])]
    out.append(Spacer(1, 4))
    for b in bullets:
        out.append(Paragraph(b, S["bullet"], bulletText="–"))
    out.append(Spacer(1, 7))
    return KeepTogether(out)


def dos_columnas(filas, ancho_izq=0.68):
    """Tabla de dos columnas para formación, certificados e idiomas."""
    data = [[Paragraph(a, S["body"]), Paragraph(b, S["dates"])] for a, b in filas]
    t = Table(data, colWidths=[CONTENT_W * ancho_izq,
                               CONTENT_W * (1 - ancho_izq)])
    t.setStyle(TableStyle(FLAT + [
        ("TOPPADDING", (0, 0), (-1, -1), 1.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.6),
    ]))
    return t


# -------------------------------------------------------------- contenido ---

NOMBRE = "Piero Alejandro Atausinchi Mayorga"

# Lo que no se traduce: teléfono, correo, enlaces y nombres propios.
TELEFONO_CORREO = DOT.join(["(+34) 637 219 546", "qando0kna29@gmail.com"])
ENLACES = DOT.join(["piero-portfolio.vercel.app",
                    "linkedin.com/in/piero-atausinchi",
                    "github.com/atausinchi0411"])

ES = {
    "titular": "Ingeniero de Fiabilidad" + DOT + "Ingeniero Mecánico, MBA",
    "ubicacion": "Súria, Barcelona, España",
    "estatus": DOT.join(["Nacionalidad peruana", "Permiso de trabajo en España"]),
    "secciones": ("Experiencia", "Formación", "Certificaciones",
                  "Competencias", "Idiomas"),
    "pagina": "Página %d",
    "perfil": (
        "Ingeniero mecánico con MBA, especializado en fiabilidad de equipos móviles en "
        "operación minera subterránea. Trabajo el análisis de fallos y la estrategia de "
        "mantenimiento con datos, y construyo las herramientas internas que hacen falta "
        "cuando esos datos no existen: la aplicación sobre la que hoy se organiza el "
        "turno de mi departamento la diseñé y la levanté yo. Seis años de ingeniería en "
        "tres países " + EMDASH + " Perú, Malta y España " + EMDASH + " dirigiendo "
        "equipos, gestionando proyectos y desplegando en campo."
    ),
    "experiencia": [
        dict(
            title="Ingeniero de Fiabilidad",
            org="ICL Iberia",
            dates="ene. 2026 " + DASH + " actualidad",
            place="Súria, Barcelona, España",
            note="Incorporado a plantilla como empleado directo tras desempeñarme como "
                 "contratista, por el rendimiento y la contribución en iniciativas de "
                 "fiabilidad.",
            bullets=[
                "Lidero iniciativas de mejora de fiabilidad en equipos móviles mineros en operación subterránea de sal y potasa, enfocadas en aumentar la disponibilidad y reducir fallos recurrentes.",
                "Ejecuto análisis de fallos y Análisis de Causa Raíz (RCA), traduciendo los hallazgos en ajustes de planes de mantenimiento y acciones prácticas en campo.",
                "Impulso proyectos de estandarización y consolidación de lubricantes, con evaluación técnica de grasas y alineación con buenas prácticas de fiabilidad.",
                "Realizo análisis de criticidad de activos y optimizo estrategias de mantenimiento preventivo en SAP PM según riesgo operacional e impacto en producción.",
                "Monitorizo indicadores de fiabilidad (MTBF, MTTR, tendencias de indisponibilidad) para sostener las decisiones de mantenimiento sobre datos y no sobre intuición.",
                "Diseñé y construí Nexo, la aplicación interna que sustituyó los registros manuales y los Excels compartidos para el estado de máquina, el relevo de turno y los informes de fiabilidad. En despliegue con un primer grupo de usuarios.",
            ],
        ),
        dict(
            title="Líder de Implementación " + EMDASH + " Mantenimiento Preventivo",
            org="Oxigent &#183; ICL Iberia",
            dates="oct. 2025 " + DASH + " ene. 2026",
            place="Súria, Barcelona, España",
            note=None,
            bullets=[
                "Lideré la implantación de nuevos procesos y sistemas en campo, incluyendo estándares de alineación y el programa de consolidación de lubricantes.",
                "Responsable de la integración de tecnología: mejoras de planes preventivos en SAP, gestión de IoT para mantenimiento predictivo y apoyo a SAP Mobile.",
                "Actué como líder de cambio, mentor y gestor de proyecto, con enfoque práctico y apoyo continuo en planta.",
                "Trabajé la resistencia al cambio con todos los niveles de la organización, que es donde se cae la mayoría de estas implantaciones.",
            ],
        ),
        dict(
            title="Ingeniero Mecánico " + EMDASH + " Técnico GIS",
            org="Infinite Fusion &#183; Water Services Corporation",
            dates="oct. 2023 " + DASH + " sep. 2025",
            place="Luqa, Malta",
            note=None,
            bullets=[
                "Uso de herramientas de Sistemas de Información Geográfica (GIS) para capturar, almacenar, verificar y representar la distribución de nuevas válvulas y tuberías en proyectos de toda Malta.",
                "Aplicación de lectura de mapas y localización para la planificación y ejecución de los proyectos.",
                "Informes diarios y actualizaciones en ArcMap para la Water Services Corporation.",
            ],
        ),
        dict(
            title="Coordinador de Proyectos",
            org="Infinite Fusion",
            dates="ago. 2023 " + DASH + " oct. 2023",
            place="Qormi, Malta",
            note=None,
            bullets=[
                "Consolidé los procesos del proyecto en MS Project: programación, dependencias y asignación de recursos.",
                "Recogí el criterio técnico en obra para construir un cronograma completo, con visión clara de plazos y tareas.",
                "Lideré la comunicación con un equipo de 13 personas, llevando necesidades hacia dirección y decisiones de vuelta al equipo.",
                "Coordiné compras y aseguré que los materiales llegaran a obra dos semanas antes de necesitarse, que es lo que mantuvo el cronograma en pie.",
                "Entregué el archivo de planificación completo del proyecto de la granja de Żurrieq, adaptado también a Excel para que el equipo pudiera leerlo.",
            ],
        ),
        dict(
            title="Ingeniero de Diseño, Proyectos y Operaciones",
            org="AQUATERMICA Servicios Generales S.A.C",
            dates="dic. 2020 " + DASH + " mar. 2023",
            place="Lima, Perú",
            note=None,
            bullets=[
                "Dirigí un equipo de 10 personas en logística, producción y servicios.",
                "Lideré la gestión del proyecto de implantación de un ERP, cerrando la comunicación entre departamentos.",
                "Rediseñé una caldera doméstica de 5 BHP reduciendo el coste de producción un 10% y mejorando el rendimiento térmico. Fue mi tesis.",
                "Ejecuté análisis de control de costes que bajaron los costes de producción un 15%.",
                "Desarrollé modelos y planos 3D en Autodesk Inventor para el diseño de equipos.",
                "Gestioné la búsqueda de proveedores para importación FOB, con ahorro de coste y entrega puntual de materiales.",
                "Realicé entrevistas y evaluación técnica de personal nuevo.",
            ],
        ),
        dict(
            title="Modelador 3D de partes mecánicas " + EMDASH + " Freelance",
            org="HYDROSTEEL S.A.C",
            dates="2020 " + DASH + " 2022",
            place="Lima, Perú",
            note=None,
            bullets=[
                "Construí modelos 3D de máquinas en Autodesk Inventor a partir de pedidos y planos de cliente, con el detalle necesario para fabricar a partir de ellos.",
                "Trabajé directamente con los clientes en especificaciones y revisiones.",
            ],
        ),
        dict(
            title="Líder de Equipo y Diseño",
            org="Clínica San Juan de Dios &#183; Proyecto UTEC",
            dates="feb. 2020 " + DASH + " jul. 2020",
            place="Lima, Perú",
            note=None,
            bullets=[
                "Ejecuté la primera fase de evaluación económica y técnica de la planta térmica de la clínica.",
                "Detecté que el caldero estaba sobredimensionado un 150%, y cuantifiqué la energía que se perdía por ello.",
            ],
        ),
    ],
    "formacion": [
        ("MBA " + EMDASH + " Master in Business Administration",
         "London School of Commerce Malta", "2024"),
        ("Grado en Ingeniería Mecánica",
         "UTEC " + EMDASH + " Universidad de Ingeniería y Tecnología, Lima",
         "2016 " + DASH + " 2021"),
    ],
    "certificados": [
        ("Excel Avanzado + Certificación Internacional",
         "Cámara de Comercio Exterior, Lima", "2022"),
        ("Cálculo y diseño de recipientes a presión según ASME VIII",
         "CISold, Lima", "2023"),
        ("Sistemas de bombeo para edificios",
         "Makoto Ingenieros Sanitarios, Lima", "2022"),
        ("Funcionamiento y mantenimiento de calderas",
         "IDIA " + EMDASH + " Institute of Applied Engineering", "2019"),
        ("Funcionamiento y manejo de bombas centrífugas", "b2b Strategies", "2018"),
    ],
    "competencias": [
        ("Fiabilidad y mantenimiento",
         "RCA &#183; Análisis de fallos &#183; MTBF / MTTR &#183; Criticidad de activos "
         "&#183; RCM &#183; Estrategia de mantenimiento preventivo &#183; "
         "Estandarización de lubricación"),
        ("Sistemas de mantenimiento",
         "SAP PM &#183; SAP Mobile &#183; IoT para mantenimiento predictivo &#183; "
         "Análisis de coste por tonelada"),
        ("Datos y automatización",
         "Python &#183; SQL Server &#183; Excel / VBA &#183; Power Automate &#183; "
         "ArcMap / GIS &#183; Estadística en Excel"),
        ("Herramientas internas",
         "React &#183; Node.js &#183; TypeScript &#183; HTML / CSS " + EMDASH +
         " usado para construir las aplicaciones de mantenimiento descritas arriba"),
        ("Diseño e ingeniería",
         "Autodesk Inventor &#183; SolidWorks &#183; AutoCAD &#183; ANSYS Fluent "
         "&#183; LOGO Soft Comfort V8"),
        ("Gestión",
         "Dirección de equipos &#183; Gestión de proyectos &#183; MS Project &#183; ERP "
         "&#183; Gestión del cambio &#183; Mentoría &#183; Despliegue en campo"),
    ],
    "idiomas": [
        ("Español", "Lengua materna"),
        ("Inglés", "C2 comprensión &#183; C1 expresión oral y escrita"),
        ("Catalán", "Comprensión"),
    ],
}

EN = {
    "titular": "Reliability Engineer" + DOT + "Mechanical Engineer, MBA",
    "ubicacion": "Súria, Barcelona, Spain",
    "estatus": DOT.join(["Peruvian national", "Spanish work permit"]),
    "secciones": ("Experience", "Education", "Certifications",
                  "Skills", "Languages"),
    "pagina": "Page %d",
    "perfil": (
        "Mechanical engineer with an MBA, working reliability on mobile equipment in an "
        "underground mining operation. I run failure analysis and maintenance strategy "
        "on data, and I build the internal tools that are missing when that data does "
        "not exist: the application my department now runs its shift on is one I "
        "designed and built. Six years of engineering across three countries " +
        EMDASH + " Peru, Malta and Spain " + EMDASH + " leading teams, managing "
        "projects and rolling out in the field."
    ),
    "experiencia": [
        dict(
            title="Reliability Engineer",
            org="ICL Iberia",
            dates="Jan 2026 " + DASH + " Present",
            place="Súria, Barcelona, Spain",
            note="Moved onto the payroll as a direct employee after working as a "
                 "contractor, on the strength of the contribution to reliability "
                 "initiatives.",
            bullets=[
                "Lead reliability improvement work on mobile mining equipment in an underground salt and potash operation, aimed at raising availability and cutting recurring failures.",
                "Run failure analysis and Root Cause Analysis (RCA), turning findings into maintenance plan changes and practical action in the field.",
                "Drive lubricant standardisation and consolidation projects, including technical assessment of greases against reliability best practice.",
                "Carry out asset criticality analysis and optimise preventive maintenance strategy in SAP PM by operational risk and production impact.",
                "Track reliability indicators (MTBF, MTTR, downtime trends) so maintenance decisions rest on data rather than on instinct.",
                "Designed and built Nexo, the internal application that replaced manual records and shared spreadsheets for machine status, shift handover and reliability reporting. Currently in rollout with a first group of users.",
            ],
        ),
        dict(
            title="Implementation Lead " + EMDASH + " Preventive Maintenance",
            org="Oxigent &#183; ICL Iberia",
            dates="Oct 2025 " + DASH + " Jan 2026",
            place="Súria, Barcelona, Spain",
            note=None,
            bullets=[
                "Led the rollout of new processes and systems in the field, including alignment standards and the lubricant consolidation programme.",
                "Owned technology integration: preventive plan improvements in SAP, IoT for predictive maintenance, and support for SAP Mobile.",
                "Acted as change leader, mentor and project manager, hands-on and present on site.",
                "Worked through resistance to change at every level of the organisation, which is where most of these rollouts fail.",
            ],
        ),
        dict(
            title="Mechanical Engineer " + EMDASH + " GIS Technician",
            org="Infinite Fusion &#183; Water Services Corporation",
            dates="Oct 2023 " + DASH + " Sep 2025",
            place="Luqa, Malta",
            note=None,
            bullets=[
                "Used Geographic Information System (GIS) tools to capture, store, verify and display the distribution of new valves and pipework on projects across Malta.",
                "Applied map reading and location work to project planning and execution.",
                "Daily reporting and ArcMap updates for the Water Services Corporation.",
            ],
        ),
        dict(
            title="Project Coordinator",
            org="Infinite Fusion",
            dates="Aug 2023 " + DASH + " Oct 2023",
            place="Qormi, Malta",
            note=None,
            bullets=[
                "Consolidated project processes in MS Project: scheduling, dependencies and resource allocation.",
                "Gathered on-site expert judgement to build a complete schedule, giving a clear view of timelines and tasks.",
                "Led communication with a team of 13, carrying needs up to management and decisions back to the team.",
                "Coordinated procurement and got materials on site two weeks before they were needed, which is what kept the schedule standing.",
                "Delivered the full planning file for the Żurrieq farmhouse project, adapted to Excel so the team could actually read it.",
            ],
        ),
        dict(
            title="Design, Projects and Operations Engineer",
            org="AQUATERMICA Servicios Generales S.A.C",
            dates="Dec 2020 " + DASH + " Mar 2023",
            place="Lima, Peru",
            note=None,
            bullets=[
                "Led a team of 10 across logistics, production and services.",
                "Ran the project to implement an ERP system, closing the communication gap between departments.",
                "Redesigned a 5 BHP domestic boiler, cutting production cost by 10% and improving thermal performance. This was my thesis.",
                "Ran cost control analysis that brought production costs down by 15%.",
                "Produced 3D models and drawings in Autodesk Inventor for equipment design.",
                "Handled supplier sourcing for FOB imports, with cost savings and on-time material delivery.",
                "Interviewed and technically assessed new staff.",
            ],
        ),
        dict(
            title="3D Mechanical Parts Modeller " + EMDASH + " Freelance",
            org="HYDROSTEEL S.A.C",
            dates="2020 " + DASH + " 2022",
            place="Lima, Peru",
            note=None,
            bullets=[
                "Built 3D machine models in Autodesk Inventor from client orders and drawings, detailed enough to manufacture from.",
                "Worked directly with clients on specifications and revisions.",
            ],
        ),
        dict(
            title="Team Lead and Design",
            org="Clínica San Juan de Dios &#183; UTEC Project",
            dates="Feb 2020 " + DASH + " Jul 2020",
            place="Lima, Peru",
            note=None,
            bullets=[
                "Ran the first phase of economic and technical assessment of the clinic's thermal plant.",
                "Found the boiler was oversized by 150%, and quantified the energy being lost to it.",
            ],
        ),
    ],
    "formacion": [
        ("MBA " + EMDASH + " Master in Business Administration",
         "London School of Commerce Malta", "2024"),
        ("BSc Mechanical Engineering",
         "UTEC " + EMDASH + " University of Engineering and Technology, Lima",
         "2016 " + DASH + " 2021"),
    ],
    "certificados": [
        ("Advanced Excel + International Certification",
         "Cámara de Comercio Exterior, Lima", "2022"),
        ("Pressure vessel calculation and design to ASME VIII",
         "CISold, Lima", "2023"),
        ("Pumping systems for buildings",
         "Makoto Ingenieros Sanitarios, Lima", "2022"),
        ("Boiler operation and maintenance",
         "IDIA " + EMDASH + " Institute of Applied Engineering", "2019"),
        ("Centrifugal pump operation and handling", "b2b Strategies", "2018"),
    ],
    "competencias": [
        ("Reliability and maintenance",
         "RCA &#183; Failure analysis &#183; MTBF / MTTR &#183; Asset criticality "
         "&#183; RCM &#183; Preventive maintenance strategy &#183; "
         "Lubrication standardisation"),
        ("Maintenance systems",
         "SAP PM &#183; SAP Mobile &#183; IoT for predictive maintenance &#183; "
         "Cost-per-ton analysis"),
        ("Data and automation",
         "Python &#183; SQL Server &#183; Excel / VBA &#183; Power Automate &#183; "
         "ArcMap / GIS &#183; Statistics in Excel"),
        ("Internal tooling",
         "React &#183; Node.js &#183; TypeScript &#183; HTML / CSS " + EMDASH +
         " used to build the maintenance applications described above"),
        ("Design and engineering",
         "Autodesk Inventor &#183; SolidWorks &#183; AutoCAD &#183; ANSYS Fluent "
         "&#183; LOGO Soft Comfort V8"),
        ("Management",
         "Team leadership &#183; Project management &#183; MS Project &#183; ERP "
         "&#183; Change management &#183; Mentoring &#183; Field rollout"),
    ],
    "idiomas": [
        ("Spanish", "Native"),
        ("English", "C2 comprehension &#183; C1 speaking and writing"),
        ("Catalan", "Comprehension"),
    ],
}


# ------------------------------------------------------------- maquetado ---


def construir(c, salida):
    """Monta el documento con el diccionario de contenido `c`."""
    etiqueta_pagina = c["pagina"]

    def pie(canvas, doc):
        """Nombre y número de página, por si el CV se imprime y se desordena."""
        canvas.saveState()
        canvas.setFont("Helvetica", 7.4)
        canvas.setFillColor(INK_3)
        canvas.drawString(MARGIN, 8 * mm, NOMBRE)
        canvas.drawRightString(PAGE_W - MARGIN, 8 * mm,
                               etiqueta_pagina % doc.page)
        canvas.restoreState()

    doc = BaseDocTemplate(
        salida, pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=MARGIN, bottomMargin=15 * mm,
        title="CV " + NOMBRE,
        author=NOMBRE,
        subject=c["titular"].replace(DOT, " - "),
    )
    frame = Frame(MARGIN, 15 * mm, CONTENT_W, PAGE_H - MARGIN - 15 * mm,
                  id="cuerpo", leftPadding=0, rightPadding=0,
                  topPadding=0, bottomPadding=0)
    doc.addPageTemplates([PageTemplate(id="std", frames=[frame], onPage=pie)])

    exp, edu, cert, skills, langs = c["secciones"]

    story = [Paragraph(NOMBRE, S["name"]), Paragraph(c["titular"], S["role"])]
    story.append(Paragraph(c["ubicacion"] + DOT + TELEFONO_CORREO, S["contact"]))
    story.append(Paragraph(ENLACES, S["contact"]))
    story.append(Paragraph(c["estatus"], S["contact"]))
    story.append(HRFlowable(width="100%", thickness=0.6, color=LINE,
                            spaceBefore=8, spaceAfter=9))
    story.append(Paragraph(c["perfil"], S["body"]))

    story += section(exp)
    for j in c["experiencia"]:
        story.append(job(j["title"], j["org"], j["dates"], j["place"],
                         j["bullets"], j["note"]))

    story += section(edu)
    story.append(dos_columnas(
        [("<b>%s</b><br/>%s" % (n, o), a) for n, o, a in c["formacion"]]))

    story += section(cert)
    story.append(dos_columnas(
        [("%s %s <font color='#64646e'>%s</font>" % (n, EMDASH, o), a)
         for n, o, a in c["certificados"]]))

    story += section(skills)
    for cat, items in c["competencias"]:
        story.append(Paragraph("<b>%s</b> %s %s" % (cat, EMDASH, items), S["body"]))
        story.append(Spacer(1, 3.5))

    story += section(langs)
    story.append(dos_columnas([("<b>%s</b>" % n, d) for n, d in c["idiomas"]],
                              ancho_izq=0.28))

    doc.build(story)
    return salida


if __name__ == "__main__":
    aqui = os.path.dirname(os.path.abspath(__file__))
    publico = os.path.normpath(os.path.join(aqui, "..", "public"))
    os.makedirs(publico, exist_ok=True)

    for contenido, nombre in ((ES, "Piero_Atausinchi_CV_ES.pdf"),
                              (EN, "Piero_Atausinchi_CV_EN.pdf")):
        destino = os.path.join(publico, nombre)
        construir(contenido, destino)
        print("Generado: %-28s (%.0f KB)"
              % (nombre, os.path.getsize(destino) / 1024))
