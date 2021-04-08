import React, { useEffect, useState } from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import "./Table.scss";
import { urlGetAlmacen } from "../../util/rutasAPI";
import $ from "jquery";
require("datatables.net-buttons")(window, $);

export const Almacen = (props) => {
  useEffect(() => {
    $(document).ready(function () {
      var table = $("#table-almacen").DataTable({
        bProcessing: true,
        ajax: {
          method: "GET",
          url: urlGetAlmacen,
          data: { operacion: "datos" },
          headers: {
            Authorization: localStorage.getItem("auth-token"),
          },
        },
        columns: [
          {
            data: "<td class='details-control'></td>",
          },
          {
            data: "Id_Producto",
          },
          {
            data: "Desc_Producto",
          },
        ],
        columnDefs: [
          {
            targets: 0,
            data: null,
            searchable: false,
            defaultContent: "",
            createdCell: function (td, cellData, rowData, row, col) {
              if (cellData < 1) $(td).addClass("details-control");
            },
          },
        ],
        retrieve: true,
        dom: "Blfrtip",
        pageLength: 10,
        order: [[1, "asc"]],
        buttons: [
          {
            extend: "collection",
            text: "<i class='glyphicon glyphicon-download-alt'></i> Exportar",
            buttons: ["copy", "excel", "csv", "pdf", "print"],
          },
        ],
        language: {
          sProcessing: "Cargando...",
          sLengthMenu: "Mostrar _MENU_ registros",
          sZeroRecords: "No se encontraron resultados",
          sEmptyTable: "Ningún dato disponible en esta tabla",
          sInfo:
            "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
          sInfoEmpty:
            "Mostrando registros del 0 al 0 de un total de 0 registros",
          sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
          sInfoPostFix: "",
          sSearch: "Buscar:",
          searchPlaceholder: "Escribe aquí para buscar..",
          sUrl: "",
          sInfoThousands: ",",
          sLoadingRecords:
            "<img style='display: block;width:100px;margin:0 auto;' src='assets/img/loading.gif' />",
          oPaginate: {
            sFirst: "Primero",
            sLast: "Último",
            sNext: "Siguiente",
            sPrevious: "Anterior",
          },
          oAria: {
            sSortAscending:
              ": Activar para ordenar la columna de manera ascendente",
            sSortDescending:
              ": Activar para ordenar la columna de manera descendente",
          },
        },
      });

      $("#table-almacen tbody").on("click", "td.details-control", function () {
        var tr = $(this).closest("tr");
        var row = table.row(tr);
        if (row.child.isShown()) {
          row.child.hide();
          tr.removeClass("shown");
        } else {
          row
            .child(
              '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;"><tr><td>Full name:</td><td>Ajay</td></tr></table>'
            )
            .show();
          tr.addClass("shown");
        }
      });
    });
  }, []);

  return (
    <>
      <Breadcrumb text="Almacenes" />
      <div className="contentArea">
        <table id="table-almacen">
          <thead>
            <tr>
              <th className="details-control sorting_disabled" disabled></th>
              <th>Id</th>
              <th>Nomber</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
};

export default Almacen;
